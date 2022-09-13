using AutoMapper;
using Microsoft.Extensions.Options;
using TweetApp.TweetAppRepository.Interfaces;
using TweetApp.TweetAppService.Services.Interfaces;

namespace TweetApp.TweetAppService.Services
{
    public class Services : IServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public IUserService UserService { get; private set; }

        public IJwtService JwtService { get; private set; }

        public ITweetService TweetService { get; private set; }

        public IPhotoAccessor PhotoAccessor { get; private set; }

        public IPhotoService PhotoService { get; private set; }

        public Services(IUnitOfWork unitOfWork, IMapper mapper,
            IOptions<AppSettings> appSettings, IOptions<CloudinarySettings> cloudinary)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            UserService = new UserService(_unitOfWork, _mapper);
            JwtService = new JwtService(appSettings);
            TweetService = new TweetService(_unitOfWork, _mapper);
            PhotoAccessor = new PhotoAccessor(cloudinary);
            PhotoService = new PhotoService(_unitOfWork,PhotoAccessor,_mapper);
        }
    }
}
