using Microsoft.AspNetCore.Http;

namespace TweetApp.TweetAppService.Services.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhoto(IFormFile file);
        Task<string> DeletePhoto(string publicId);
    }
}
