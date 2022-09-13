using TweetApp.TweetAppModel.Input;

namespace TweetApp.TweetAppService.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(LoginDto model);
    }
}
