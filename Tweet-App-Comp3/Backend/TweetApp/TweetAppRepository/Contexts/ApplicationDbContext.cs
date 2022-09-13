#nullable disable
using Microsoft.EntityFrameworkCore;
using TweetApp.TweetAppRepository.Entities;

namespace TweetApp.TweetAppRepository.Contexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Tweet> Tweets { get; set; }
        public DbSet<ReplyTweet> ReplyTweets { get; set; }
        public DbSet<Reaction> Reactions { get; set; }
        public DbSet<Photo> Photos { get; set; }
    }
}
