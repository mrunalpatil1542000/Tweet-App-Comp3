using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TweetApp.MessegeSender;
using TweetApp.TweetAppModel;
using TweetApp.TweetAppModel.Dto;
using TweetApp.TweetAppModel.Input;
using TweetApp.TweetAppService.Services.Interfaces;

namespace TweetApp.Controllers
{
    [Route("api/v{version:apiVersion}/tweets")]
    [ApiController]
    [Authorize]
    [ApiVersion("1.0")]
    public class UsersController : ControllerBase
    {
        private readonly IServices _services;
        protected ResponseDto _response;
        private readonly IKafkaSender _kafkaSender;
        public UsersController(IServices services, IKafkaSender kafkaSender)
        {
            _services = services;
            _response = new ResponseDto();
            _kafkaSender = kafkaSender;
        }

        #region Main Endpoints

        [HttpGet("users/all")]
        public async Task<object> GetAllUsers()
        {
            try
            {
                var userList = await _services.UserService.GetAllUsers();
                _response.DisplayMessage = "User list retrieved successfully";
                _response.Result = userList;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Error cannot find the list";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
           // _kafkaSender.Publish(_response.DisplayMessage);
            return _response;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<object> Register([FromBody] UserDto userDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    throw new Exception("Invalid data");
                if (!await _services.UserService.IsUniqueUser(userDto.Email))
                {
                    var user = await _services.UserService.Register(userDto);
                    _response.Result = user;
                    _response.DisplayMessage = "User registered successfully";
                }
                else
                    throw new Exception("Username already exists");
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Error cannot register";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            _kafkaSender.Publish(_response.DisplayMessage);
            return _response;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<object> Login([FromBody] LoginDto model)
        {
            try
            {
                var user = await _services.UserService.Authenticate(model.Username, model.Password);

                if (user == null)
                    throw new Exception("Invalid username or password");

                var token = _services.JwtService.GenerateToken(model);
                _response.Result = user;
                _response.DisplayMessage = "Login successful for " + model.Username;
                _response.Token = token;

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went wrong while logging in.";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            //_kafkaSender.Publish(_response.DisplayMessage);
            return _response;
        }

        [HttpPost("{username}/forgot")]
        [AllowAnonymous]
        public async Task<object> ForgotPassword(string username, [FromBody] ForgotPassword forgot)
        {
            try
            {
                var status = await _services.UserService.ResetPassword(username, forgot.Password);

                if (status == false)
                    throw new Exception("Error while resetting password");

                _response.DisplayMessage = "Password reset successfully";
                _response.Result = status;
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

        [HttpGet("search/{username}")]
        public async Task<object> SearchUsername(string username)
        {
            try
            {
                var users = await _services.UserService.FindUsersByUsername(username);
                _response.Result = users;

                if (users == null)
                {
                    _response.DisplayMessage = "No users found";
                }
                else
                {
                    _response.DisplayMessage = "Users retrieved successfully";
                }
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
        #endregion

        #region Helper Endpoints

        [HttpGet("currentuser")]
        [AllowAnonymous]
        public async Task<object> GetCurrentUser()
        {
            try
            {
                var username = User.FindFirstValue(ClaimTypes.Email);
                var user = await _services.UserService.FindByUsername(username);
                _response.Result = user;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "You are not logged in. Please log in again";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            return _response;
        }

        [HttpPost("user/{username}/photos")]
        public async Task<object> AddPhoto(string username, [FromForm] IFormFile file)
        {
            try
            {
                var result = await _services.PhotoService.AddPhoto(username, file);
                _response.Result = result;
                _response.DisplayMessage = "Photo added successfully!";
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went wrong while adding photo. Please try again";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            return _response;
        }

        [HttpDelete("user/{username}/photo/{id}/delete")]
        public async Task<object> DeletePhoto([FromRoute] string username, [FromRoute] int id)
        {
            try
            {
                var result = await _services.PhotoService.DeletePhoto(username, id);
                if (result == true)
                    _response.DisplayMessage = "Deletion successful";
                else throw new Exception("Deletion failed");
                _response.Result = result;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went wrong while deleting photo. Please try again";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            return _response;
        }

        [HttpPost("user/{username}/photo/{id}/set-main")]
        public async Task<object> SetMainPhoto([FromRoute] string username, [FromRoute] int id)
        {
            try
            {
                var result = await _services.PhotoService.SetMainPhoto(username, id);
                if (result)
                    _response.DisplayMessage = "Main photo changed";
                else throw new Exception("Something went wrong!!!");
                _response.Result = result;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Something went wrong while setting main photo. Please try again";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            return _response;
        }

        #endregion

    }
}
