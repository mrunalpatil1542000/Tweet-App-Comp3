using TweetApp.TweetAppRepository.Contexts;
using TweetApp.TweetAppRepository.Entities;
using TweetApp.TweetAppRepository.Interfaces;

namespace TweetApp.TweetAppRepository.Repositories
{
    public class TweetRepository : Repository<Tweet>, ITweetRepository
    {
        private readonly ApplicationDbContext _db;
        public TweetRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(Tweet tweet)
        {
            _db.Tweets.Update(tweet);
        }
    }
}
