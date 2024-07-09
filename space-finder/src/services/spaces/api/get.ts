import { DynamoDBDocumentClient, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function getSpace(
  event: APIGatewayProxyEvent,
  ddb: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> {
  if (event.queryStringParameters) {
    if (!('id' in event.queryStringParameters))
      return {
        statusCode: 400,
        body: 'Missing required "id" parameter',
      };

    const spaceId = event.queryStringParameters.id;
    const result = await ddb.send(
      new GetCommand({
        TableName: process.env.SPACES_TABLE,
        Key: { pk: spaceId },
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
