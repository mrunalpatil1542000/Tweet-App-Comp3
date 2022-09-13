using TweetApp.TweetAppRepository.Entities;

namespace TweetApp.TweetAppRepository.Interfaces
{
    public interface ITweetRepository : IRepository<Tweet>
    {
        void Update(Tweet tweet);
    }
}
