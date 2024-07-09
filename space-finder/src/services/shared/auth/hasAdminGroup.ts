import { type APIGatewayProxyEvent } from "aws-lambda";

export function hasAdminGroup(event: APIGatewayProxyEvent) {
  const groups = event.requestContext.authorizer?.claims['cognito:groups'] 
  if (!groups) return false
  return (groups as string).includes('space-admins')
}