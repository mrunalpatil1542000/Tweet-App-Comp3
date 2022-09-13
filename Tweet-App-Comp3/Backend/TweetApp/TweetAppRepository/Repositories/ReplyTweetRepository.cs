using TweetApp.TweetAppRepository.Contexts;
using TweetApp.TweetAppRepository.Entities;
using TweetApp.TweetAppRepository.Interfaces;

namespace TweetApp.TweetAppRepository.Repositories
{
    public class ReplyTweetRepository : Repository<ReplyTweet>, IReplyTweetRepository
    {
        private readonly ApplicationDbContext _db;
        public ReplyTweetRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
    }
}
