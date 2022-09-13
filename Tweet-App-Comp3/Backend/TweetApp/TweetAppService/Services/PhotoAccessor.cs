﻿using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using TweetApp.TweetAppService.Services.Interfaces;
#nullable disable
namespace TweetApp.TweetAppService.Services
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;
        public PhotoAccessor(IOptions<CloudinarySettings> cloudinary)
        {
            var account = new Account(cloudinary.Value.CloudName, cloudinary.Value.ApiKey, cloudinary.Value.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }
        public async Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
            if (file.Length > 0)
            {
                await using var stream = file.OpenReadStream();

                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult=await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.Error != null)
                {
                    throw new Exception(uploadResult.Error.Message);
                }

                return new PhotoUploadResult
                {
                    PublicId = uploadResult.PublicId,
                    Url=uploadResult.SecureUrl.ToString()
                };
            }
            return null;
        }

        public async Task<string> DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? result.Result : null;
        }
    }
}
