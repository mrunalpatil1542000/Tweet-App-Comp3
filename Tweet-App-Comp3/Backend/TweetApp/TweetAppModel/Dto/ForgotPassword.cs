using System.ComponentModel.DataAnnotations;
#nullable disable
namespace TweetApp.TweetAppModel.Dto
{
    public class ForgotPassword
    {
        [Required]
        public string Password { get; set; }
    }
}
