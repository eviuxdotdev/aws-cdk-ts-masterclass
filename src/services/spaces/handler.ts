import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

export async function handler(event: APIGatewayProxyEvent, context: Context) {
  let message: string;
  switch (event.httpMethod) {
    case 'GET':
      message = 'Hello from GET'
      break;
    case 'POST':
      message = 'Hello from POST'
      break;

    default:
      message = 'Hello from method not supported' + event.httpMethod
      break;
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: message,
  };

  return response;
}
