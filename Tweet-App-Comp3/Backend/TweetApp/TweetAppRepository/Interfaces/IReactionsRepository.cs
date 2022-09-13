using TweetApp.TweetAppRepository.Entities;

namespace TweetApp.TweetAppRepository.Interfaces
{
    public interface IReactionsRepository : IRepository<Reaction>
    {
        void Update(Reaction reaction);
    }
}
