import boto3
import json

# Your SQS queue URL
QUEUE_URL = "https://sqs.ca-central-1.amazonaws.com/554882957177/order-queue"

# Initialize SQS client
sqs = boto3.client('sqs')

def receive_messages():
    response = sqs.receive_message(
        QueueUrl=QUEUE_URL,
        MaxNumberOfMessages=1,
        WaitTimeSeconds=5  # long polling
    )

    messages = response.get('Messages', [])
    for message in messages:
        message_body = message['Body']
        print("RAW MESSAGE:", message_body)

        # Try to parse JSON, fallback to plain text
        try:
            data = json.loads(message_body)
            print("✅ JSON MESSAGE:", data)
        except json.JSONDecodeError:
            print("⚠️ Plain TEXT MESSAGE:", message_body)

        # Delete message after processing
        sqs.delete_message(
            QueueUrl=QUEUE_URL,
            ReceiptHandle=message['ReceiptHandle']
        )
        print("Message deleted from queue.\n")

if __name__ == "__main__":
    receive_messages()