import boto3

sqs = boto3.client('sqs')
sns = boto3.client('sns')

queue_url = "https://sqs.ca-central-1.amazonaws.com/554882957177/order-queue"
topic_arn = "arn:aws:sns:ca-central-1:554882957177:order-topic"

# Example usage
response = sqs.send_message(
    QueueUrl=queue_url,
    MessageBody="Hello from SQS"
)

sns.publish(
    TopicArn=topic_arn,
    Message="Hello from SNS"
)

print(response)
