using TweetApp.TweetAppModel.Dto;

namespace TweetApp.TweetAppService.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDetailsDto>> GetAllUsers();
        Task<UserDetailsDto> Register(UserDto userDto);
        Task<bool> IsUniqueUser(string username);
        Task<UserDetailsDto> Authenticate(string username, string password);
        Task<UserDetailsDto> FindByUsername(string username);
        Task<IEnumerable<UserDetailsDto>> FindUsersByUsername(string username); 
        Task<bool> ResetPassword(string username, string password);
    }
}
