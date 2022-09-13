using TweetApp.TweetAppModel.Dto;

namespace TweetApp.TweetAppService.Services.Interfaces
{
    public interface ITweetService
    {
        Task<TweetDetailsDto> PostTweet(string username,TweetCreateDto userDto);
        Task<TweetDetailsDto> GetATweet(int id);
        Task<IEnumerable<TweetDetailsDto>> GetAllTweets();
        Task<IEnumerable<TweetDetailsDto>> GetTweetsByUsername(string username);
        Task<TweetDetailsDto> UpdateTweet(int id,string username,TweetCreateDto userDto);
        Task<bool> DeleteTweet(int id, string username);
        Task<ReplyResponse> ReplyTweet(string username, int id, string message);
        Task<int> LikeTweet(string username,int id);
        Task<IEnumerable<ReactionResponse>> GetReactionsList();
        Task<IEnumerable<ReplyResponse>> GetRepliesList();

    }
}
