import { DeleteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function deleteSpace(
  event: APIGatewayProxyEvent,
  ddb: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> {
  if (!event.queryStringParameters || !('id' in event.queryStringParameters))
    return { statusCode: 400, body: 'Missing required "id" parameter' };

  const spaceId = event.queryStringParameters.id;

  await ddb.send(
    new DeleteCommand({
      TableName: process.env.SPACES_TABLE,
      Key: { pk: spaceId },
    })
  );

  return {
    statusCode: 200,
    body: `Space with id ${spaceId} has been deleted`,
  };
}
