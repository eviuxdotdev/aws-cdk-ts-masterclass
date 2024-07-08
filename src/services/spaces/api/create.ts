import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ulid } from 'ulid';

export async function createSpace(
  event: APIGatewayProxyEvent,
  ddb: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const id = ulid();
  const item = JSON.parse(event.body);

  const result = await ddb.send(
    new PutItemCommand({
      TableName: process.env.SPACES_TABLE,
      Item: {
        pk: {
          S: id,
        },
        location: {
          S: item.location,
        },
      },
    })
  );
  console.log(result)

  return {
    statusCode: 201,
    body: JSON.stringify({ id }),
  };
}
