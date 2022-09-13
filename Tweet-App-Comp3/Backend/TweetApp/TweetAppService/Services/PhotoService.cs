using AutoMapper;
using TweetApp.TweetAppModel.Dto;
using TweetApp.TweetAppRepository.Entities;
using TweetApp.TweetAppRepository.Interfaces;
using TweetApp.TweetAppService.Services.Interfaces;
#nullable disable

namespace TweetApp.TweetAppService.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoAccessor _photoAccessor;
        public PhotoService(IUnitOfWork unitOfWork, IPhotoAccessor photoAccessor,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoAccessor = photoAccessor;
        }

        public async Task<UserDetailsDto> AddPhoto(string username, IFormFile file)
        {
            var user = await _unitOfWork
                .User.GetFirstOrDefaultAsync(x => x.Email == username, includeProperties: "Photos");
            if (user == null) return null;

            var photoUploadResult = await _photoAccessor.AddPhoto(file);

            var photo = new Photo
            {
                Url = photoUploadResult.Url,
                PublicId = photoUploadResult.PublicId
            };

            if (!user.Photos.Any(x => x.IsMain))
            {
                photo.IsMain = true;
            }

            user.Photos.Add(photo);

            await _unitOfWork.Save();

            var response=_mapper.Map<UserDetailsDto>(user);

            if(!response.Photos.Any(x=>x.IsMain))
            {
                response.Image = photo.Url;
            }

            return response;
        }

        public async Task<bool> DeletePhoto(string username, int id)
        {
            var user = await _unitOfWork.User.GetFirstOrDefaultAsync(x => x.Email == username, includeProperties: "Photos");

            if (user == null)
                return false;
            
            var photo=user.Photos.FirstOrDefault(x=>x.Id == id);

            if(photo == null||photo.IsMain)  return false;

            var result = await _photoAccessor.DeletePhoto(photo.PublicId);

            if (result == null) return false;

            user.Photos.Remove(photo);
            _unitOfWork.Photo.Remove(photo);

            await _unitOfWork.Save();

            return true;
        }

        public async Task<bool> SetMainPhoto(string username, int id)
        {
            var user = await _unitOfWork.User.GetFirstOrDefaultAsync(x => x.Email == username, includeProperties: "Photos");

            if (user == null) return false;

            var photo=user.Photos.FirstOrDefault(x=>x.Id==id);

            if (photo == null||photo.IsMain) return false;
            
            var currentMain=user.Photos.FirstOrDefault(x=>x.IsMain);

            if (currentMain != null) currentMain.IsMain = false;

            photo.IsMain = true;

            await _unitOfWork.Save();
            return true;
        }
    }
}
