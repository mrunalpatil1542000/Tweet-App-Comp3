namespace TweetApp.TweetAppRepository.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository User { get; }
        ITweetRepository Tweet { get; }
        IReplyTweetRepository ReplyTweet { get; }
        IReactionsRepository Reactions { get; }
        IPhotoRepository Photo { get; }
        Task Save();
    }
}
