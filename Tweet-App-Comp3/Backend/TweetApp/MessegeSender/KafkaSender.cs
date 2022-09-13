using Azure.Messaging.ServiceBus;

namespace TweetApp.MessegeSender
{
    public class KafkaSender : IKafkaSender
    {
        async public void Publish(string message)
        {
            var conStr = "Endpoint=sb://tweetappservicebusmap.servicebus.windows.net/;SharedAccessKeyName=policytweetapp;SharedAccessKey=xZFx45+90bkU89ZLVxlztQvhpqn432zHggkvCkfDPvk=;EntityPath=tweetapptopic";
            var client = new ServiceBusClient(conStr);
            var sender = client.CreateSender("tweetappTopic");
            var Message = new ServiceBusMessage(message);
            await sender.SendMessageAsync(Message);

        }
    }
}
