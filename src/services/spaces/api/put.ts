import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function putSpace(
  event: APIGatewayProxyEvent,
  ddb: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> {
  if (!event.body)
    return { statusCode: 400, body: 'Request body is required.' };
  if (!event.queryStringParameters || !('id' in event.queryStringParameters))
    return { statusCode: 400, body: 'Missing required "id" parameter' };

  const spaceId = event.queryStringParameters.id;
  const requestBody = JSON.parse(event.body);

  const updateKey = Object.keys(requestBody)[0];
  const updateValue = requestBody[updateKey];

  const result = await ddb.send(
    new UpdateCommand({
      TableName: process.env.SPACES_TABLE,
      Key: { pk: spaceId },
      UpdateExpression: 'SET #updateKey = :updateValue',
      ExpressionAttributeNames: { '#updateKey': updateKey },
      ExpressionAttributeValues: { ':updateValue': updateValue },
      ReturnValues: 'UPDATED_NEW',
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify(result.Attributes || {}),
  };
}
