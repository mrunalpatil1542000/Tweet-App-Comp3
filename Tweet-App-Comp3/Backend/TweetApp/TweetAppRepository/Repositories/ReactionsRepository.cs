using TweetApp.TweetAppRepository.Contexts;
using TweetApp.TweetAppRepository.Entities;
using TweetApp.TweetAppRepository.Interfaces;

namespace TweetApp.TweetAppRepository.Repositories
{
    public class ReactionsRepository : Repository<Reaction>, IReactionsRepository
    {
        private readonly ApplicationDbContext _db;
        public ReactionsRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(Reaction reaction)
        {
            _db.Reactions.Update(reaction);
        }
    }
}
