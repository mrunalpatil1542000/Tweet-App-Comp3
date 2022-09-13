using TweetApp.TweetAppModel.Dto;

namespace TweetApp.TweetAppService.Services.Interfaces
{
    public interface IPhotoService
    {
        Task<UserDetailsDto> AddPhoto(string username,IFormFile file);
        Task<bool> DeletePhoto(string username,int id);
        Task<bool> SetMainPhoto(string username,int id);

    }
}
