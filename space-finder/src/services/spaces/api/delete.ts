import { DeleteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { hasAdminGroup } from '../../shared/auth/hasAdminGroup';

export async function deleteSpace(
  event: APIGatewayProxyEvent,
  ddb: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> {
  if (!hasAdminGroup(event))
    return { statusCode: 401, body: 'Only administrators can delete a space' };

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
