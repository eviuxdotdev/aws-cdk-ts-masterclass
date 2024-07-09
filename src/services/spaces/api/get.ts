import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function getSpace(
  event: APIGatewayProxyEvent,
  ddb: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (event.queryStringParameters) {
    if (!('id' in event.queryStringParameters))
      return {
        statusCode: 400,
        body: 'Missing required "id" parameter',
      };

    const spaceId = event.queryStringParameters.id;
    const result = await ddb.send(
      new GetItemCommand({
        TableName: process.env.SPACES_TABLE,
        Key: { pk: { S: spaceId } },
      })
    );

    if (!result.Item)
      return { statusCode: 404, body: `Space with id ${spaceId} is not found` };

    return { statusCode: 200, body: JSON.stringify(result.Item) };
  }

  const result = await ddb.send(
    new ScanCommand({
      TableName: process.env.SPACES_TABLE,
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      items: result.Items,
      count: result.Count,
    }),
  };
}
