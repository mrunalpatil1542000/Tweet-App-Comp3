namespace TweetApp.MessegeSender
{
    public interface IKafkaSender
    {
        void Publish(string message);
    }
}
