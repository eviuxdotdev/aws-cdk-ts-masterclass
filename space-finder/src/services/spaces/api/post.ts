import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ulid } from 'ulid';
import { parseJson } from '../../shared/parseJson';

export async function postSpace(
  event: APIGatewayProxyEvent,
  ddb: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> {
  const id = ulid();
  const item = parseJson(event.body);

  const result = await ddb.send(
    new PutCommand({
      TableName: process.env.SPACES_TABLE,
      Item: {
        pk: id,
        location: item,
      },
    })
  );

  return {
    statusCode: 201,
    body: JSON.stringify({ id }),
  };
}
