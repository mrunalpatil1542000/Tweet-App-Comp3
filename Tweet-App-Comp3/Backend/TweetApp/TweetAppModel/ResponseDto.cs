#nullable disable

namespace TweetApp.TweetAppModel
{
    public class ResponseDto
    {
        public bool IsSuccess { get; set; } = true;
        public object Result { get; set; }
        public string DisplayMessage { get; set; }
        public List<string> ErrorMessages { get; set; }
        public string Token { get; set; } = string.Empty;
    }
}
