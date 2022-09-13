using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable
namespace TweetApp.TweetAppRepository.Entities
{
    public class ReplyTweet
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        public int TweetId { get; set; }
        [ForeignKey("TweetId")]
        public Tweet Tweet { get; set; }

        public string Message { get; set; }

        public DateTime DatePosted { get; set; } = DateTime.Now;
    }
}
