#nullable disable

using System.ComponentModel.DataAnnotations;

namespace TweetApp.TweetAppModel.Dto
{
    public class UserDto
    {
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [StringLength(15)]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm password is required")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Confirm password must be same as password")]
        public string ConfirmPassword { get; set; }

        [Required]
        public string ContactNumber { get; set; }

    }
}
