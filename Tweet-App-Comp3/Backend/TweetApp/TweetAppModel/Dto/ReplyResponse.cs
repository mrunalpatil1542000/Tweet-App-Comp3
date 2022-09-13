#nullable disable

namespace TweetApp.TweetAppModel.Dto
{
    public class ReplyResponse
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public UserDetailsDto User { get; set; }
        public int TweetId { get; set; }
        public string Message { get; set; }
        public DateTime DatePosted { get; set; }
    }
}
