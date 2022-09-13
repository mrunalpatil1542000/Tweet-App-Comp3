#nullable disable
namespace TweetApp.TweetAppModel.Input
{
    public class RegisterDto
    {
        /// <summary>
        /// User first name
        /// </summary>
        /// <example>Tom</example>
        public string FirstName { get; set; }

        /// <summary>
        /// User surname
        /// </summary>
        /// <example>Holland</example>
        public string LastName { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        /// <example>email@email.com</example>
        public string Email { get; set; }

        /// <summary>
        /// Username
        /// </summary>
        /// <example>tom-holland</example>
        public string LoginId { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        /// <example>Password123!@#</example>
        public string Password { get; set; }

        /// <summary>
        /// Confirm password
        /// </summary>
        /// <example>Password123!@#</example>
        public string ConfirmPassword { get; set; }

        /// <summary>
        /// Phone number
        /// </summary>
        /// <example>+48123456789</example>
        public string ContactNumber { get; set; }

    }
}
