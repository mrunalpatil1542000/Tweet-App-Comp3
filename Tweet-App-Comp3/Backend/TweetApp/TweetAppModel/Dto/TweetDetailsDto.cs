#nullable disable
using System.ComponentModel.DataAnnotations;

namespace TweetApp.TweetAppModel.Dto
{
    public class TweetDetailsDto
    {
        public int Id { get; set; }

        [MaxLength(50)]
        public string Tag { get; set; }

        [MaxLength(144)]
        public string Subject { get; set; }

        public int UserId { get; set; }
        public UserDetailsDto User { get; set; }
        public DateTime DatePosted { get; set; }
    }
}
