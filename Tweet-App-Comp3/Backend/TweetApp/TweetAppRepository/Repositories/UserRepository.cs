using TweetApp.TweetAppRepository.Contexts;
using TweetApp.TweetAppRepository.Entities;
using TweetApp.TweetAppRepository.Interfaces;

namespace TweetApp.TweetAppRepository.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly ApplicationDbContext _db;
        public UserRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(User user)
        {
            _db.Users.Update(user);
        }
    }
}
