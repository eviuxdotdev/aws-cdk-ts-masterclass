import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { postSpace } from './api/post';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { getSpace } from './api/get';

const ddbClient = new DynamoDBClient({});

export async function handler(event: APIGatewayProxyEvent, context: Context) {
  let message: string;

  try {
    switch (event.httpMethod) {
      case 'GET':
        const response = await getSpace(event, ddbClient);
        return response;
      case 'POST':
        return await postSpace(event, ddbClient);

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
