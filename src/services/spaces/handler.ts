import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { getSpace } from './api/get';
import { postSpace } from './api/post';
import { putSpace } from './api/put';
import { deleteSpace } from './api/delete';

const ddbClient = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export async function handler(event: APIGatewayProxyEvent, context: Context) {
  let message: string;

  try {
    switch (event.httpMethod) {
      case 'GET':
        return await getSpace(event, ddbDocClient);
      case 'POST':
        return await postSpace(event, ddbDocClient);
      case 'PUT':
        return await putSpace(event, ddbDocClient);
      case 'DELETE':
        return await deleteSpace(event, ddbDocClient);

      default:
        message = 'Hello from method not supported' + event.httpMethod;
        break;
    }
  } catch (e: unknown) {
    console.error(e);
    return { statusCode: 500, body: 'Error inesperado' };
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: message,
  };

  return response;
}
