namespace TweetApp.TweetAppService.Services.Interfaces
{
    public interface IServices
    {
        IUserService UserService { get; }
        IJwtService JwtService { get; }
        ITweetService TweetService { get; }
        IPhotoAccessor PhotoAccessor { get; }
        IPhotoService PhotoService { get; }
    }
}
