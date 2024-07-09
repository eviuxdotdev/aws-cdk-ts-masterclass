import { Stack, StackProps } from 'aws-cdk-lib';
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  LambdaIntegration,
  MethodOptions,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway';
import { IUserPool } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

interface ApiStackProps extends StackProps {
  spacesLambdaIntegration: LambdaIntegration;
  spacesUserPool: IUserPool;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
    const api = new RestApi(this, 'SpacesApi');

    const authorizer = new CognitoUserPoolsAuthorizer(
      this,
      'SpacesApiAuthorizer',
      {
        cognitoUserPools: [props.spacesUserPool],
        identitySource: 'method.request.header.Authorization',
      }
    );
    authorizer._attachToApi(api);

    const methodOptionsWithAuth: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: authorizer.authorizerId,
      },
    };

    const spacesResource = api.root.addResource('spaces');
    spacesResource.addMethod(
      'GET',
      props.spacesLambdaIntegration,
      methodOptionsWithAuth
    );
    spacesResource.addMethod(
      'POST',
      props.spacesLambdaIntegration,
      methodOptionsWithAuth
    );
    spacesResource.addMethod(
      'PUT',
      props.spacesLambdaIntegration,
      methodOptionsWithAuth
    );
    spacesResource.addMethod(
      'DELETE',
      props.spacesLambdaIntegration,
      methodOptionsWithAuth
    );
  }
}
