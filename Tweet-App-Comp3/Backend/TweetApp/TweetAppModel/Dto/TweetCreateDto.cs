#nullable disable

using System.ComponentModel.DataAnnotations;

namespace TweetApp.TweetAppModel.Dto
{
    public class TweetCreateDto
    {
        [MaxLength(50)]
        public string Tag { get; set; }

        [MaxLength(144)]
        [Required]
        public string Subject { get; set; }

    }
}
