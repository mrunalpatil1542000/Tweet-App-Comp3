using TweetApp.TweetAppRepository.Entities;

namespace TweetApp.TweetAppRepository.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        void Update(User user);
    }
}
