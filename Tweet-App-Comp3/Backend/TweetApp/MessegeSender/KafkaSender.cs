using Azure.Messaging.ServiceBus;

namespace TweetApp.MessegeSender
{
    public class KafkaSender : IKafkaSender
    {
        async public void Publish(string message)
        {
            var conStr = "Your service bus con string";
            var client = new ServiceBusClient(conStr);
            var sender = client.CreateSender("Your topic name");
            var Message = new ServiceBusMessage(message);
            await sender.SendMessageAsync(Message);

        }
    }
}
