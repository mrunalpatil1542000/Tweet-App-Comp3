#nullable disable

namespace TweetApp.TweetAppModel.Input
{
    /// <summary>
    /// User login information
    /// </summary>
    public class LoginDto
    {
        /// <summary>
        /// User login 
        /// </summary>
        /// <example>username</example>
        public string Username { get; set; }

        /// <summary>
        /// User password
        /// </summary>
        /// <example>Password123!@#</example>
        public string Password { get; set; }
    }

}
