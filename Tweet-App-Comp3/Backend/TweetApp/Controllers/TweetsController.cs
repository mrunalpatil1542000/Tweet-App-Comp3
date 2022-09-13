using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TweetApp.MessegeSender;
using TweetApp.TweetAppModel;
using TweetApp.TweetAppModel.Dto;
using TweetApp.TweetAppService.Services.Interfaces;

namespace TweetApp.Controllers
{
    [Route("api/v{version:apiVersion}/tweets")]
    [ApiController]
    [Authorize]
    [ApiVersion("1.0")]
    public class TweetsController : ControllerBase
    {
        private readonly IServices _services;
        protected ResponseDto _response;
        private readonly IKafkaSender _kafkaSender;

        public TweetsController(IServices services, IKafkaSender kafkaSender)
        {
            _services = services;
            _response = new ResponseDto();
            _kafkaSender = kafkaSender;
        }

        #region Main Endpoints

        [HttpPost("{username}/add")]
        public async Task<object> PostTweet([FromRoute] string username, [FromBody] TweetCreateDto tweetDto)
        {
            try
            {
                var tweet = await _services.TweetService.PostTweet(username, tweetDto);
                _response.Result = tweet;
                _response.DisplayMessage = "Tweet posted successfully";
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went wrong!";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            _kafkaSender.Publish(_response.DisplayMessage);
            return _response;
        }

        [HttpGet("all")]
        //[AllowAnonymous]
        public async Task<object> ViewAllTweets()
        {
            try
            {
                var tweets = await _services.TweetService.GetAllTweets();
                _response.Result = tweets;
                _response.DisplayMessage = "List of tweets fetched successfully";
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went wrong!";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            //_kafkaSender.Publish(_response.DisplayMessage);
            return _response;
        }

        [HttpGet("{username}")]
        public async Task<object> GetAllTweetsOfUser(string username)
        {
            try
            {
                var tweetList = await _services.TweetService.GetTweetsByUsername(username);
                _response.Result = tweetList;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went wrong!";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            //_kafkaSender.Publish(_response.DisplayMessage);
            return _response;
        }

        [HttpPut("{username}/update/{id}")]
        public async Task<object> UpdateTweet([FromRoute] string username, [FromRoute] int id, [FromBody] TweetCreateDto tweetDto)
        {
            try
            {
                var status = await _services.TweetService.UpdateTweet(id, username, tweetDto);
                if (status != null)
                {
                    _response.Result = status;
                    _response.DisplayMessage = "Tweet updated successfully";
                }
                else
                    throw new Exception("Something wrong!!!");
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went wrong while updating tweet! Please try again later.";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            //_kafkaSender.Publish(_response.DisplayMessage);
            return _response;
        }

        [HttpDelete("{username}/delete/{id}")]
        public async Task<object> DeleteTweet([FromRoute] string username, [FromRoute] int id)
        {
            try
            {
                var status = await _services.TweetService.DeleteTweet(id, username);
                if (status)
                {
                    _response.Result = true;
                    _response.DisplayMessage = "Tweet deleted successfully";
                }
                else
                    throw new Exception("Something wrong!!!");
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went wrong while deleting tweet! Please try again later.";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
           //_kafkaSender.Publish(_response.DisplayMessage);
            return _response;
        }

        [HttpPost("{username}/reply/{id}")]
        public async Task<object> ReplyTweet([FromRoute] string username, [FromRoute] int id, [FromBody] Body body)
        {
            try
            {
                var replyObj = await _services.TweetService.ReplyTweet(username, id, body.Message);
                _response.Result = replyObj;
                _response.DisplayMessage = "Replied Successfully";
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went wrong while replying the tweet! Please try again later.";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            //_kafkaSender.Publish(_response.DisplayMessage);
            return _response;
        }

        [HttpPost("{username}/like/{id}")]
        public async Task<object> LikeTweet([FromRoute] string username, [FromRoute] int id)
        {
            try
            {
                var status = await _services.TweetService.LikeTweet(username, id);
                _response.Result = status;
                _response.DisplayMessage = "Tweet liked successfully";
            }
            catch (Exception ex)
            {
                _response.Result = false;
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went wrong while replying the tweet! Please try again later.";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
           //_kafkaSender.Publish(_response.DisplayMessage);
            return _response;
        }

        #endregion

        #region Helper Endpoints

        [HttpGet("details/{id}")]
        public async Task<object> GetATweet(int id)
        {
            try
            {
                var tweet = await _services.TweetService.GetATweet(id);
                if (tweet == null)
                    throw new Exception("No tweets found");
                _response.Result = tweet;
                _response.DisplayMessage = "Tweet fetched successfully";
            }
            catch (Exception ex)
            {
                _response.Result = false;
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went wrong while displaying the tweet! Please try again later.";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            //_kafkaSender.Publish(_response.DisplayMessage);
            return _response;
        }
        [HttpGet("replies")]
        public async Task<object> GetAllReplies()
        {
            try
            {
                var responses = await _services.TweetService.GetRepliesList();
                _response.Result = responses;
                _response.DisplayMessage = "Replies fetched";
            }
            catch (Exception ex)
            {
                _response.Result = false;
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went wrong.";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            //_kafkaSender.Publish(_response.DisplayMessage);
            return _response;
        }
        [HttpGet("reactions")]
        public async Task<object> GetAllReactions()
        {
            try
            {
                var responses = await _services.TweetService.GetReactionsList();
                _response.Result = responses;
                _response.DisplayMessage = "Reactions fetched";
            }
            catch (Exception ex)
            {
                _response.Result = false;
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went wrong.";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            //_kafkaSender.Publish(_response.DisplayMessage);
            return _response;
        }
        #endregion
    }
}
