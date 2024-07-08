import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { createSpace } from './api/create';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const ddbClient = new DynamoDBClient({});

export async function handler(event: APIGatewayProxyEvent, context: Context) {
  let message: string;

  try {
    switch (event.httpMethod) {
      case 'GET':
        message = 'Hello from GET';
        break;
      case 'POST':
        return createSpace(event, ddbClient);

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
