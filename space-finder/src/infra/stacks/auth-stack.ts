import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import {
  CfnIdentityPool,
  CfnUserPoolGroup,
  UserPool,
  UserPoolClient,
} from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class AuthStack extends Stack {
  public userPool: UserPool;
  private userPoolClient: UserPoolClient;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.createUserPool();
    this.createUserPoolClient();
    this.createAdminUserGroup();
    this.createIdentityPool();
  }

  private createUserPool() {
    this.userPool = new UserPool(this, 'SpacesUserPool', {
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true,
      },
    });

    new CfnOutput(this, 'SpacesUserPoolId', {
      value: this.userPool.userPoolId,
    });
  }

  private createUserPoolClient() {
    this.userPoolClient = this.userPool.addClient('SpaceUserPoolClient', {
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true,
      },
    });

    new CfnOutput(this, 'SpacesUserPoolClientId', {
      value: this.userPoolClient.userPoolClientId,
    });
  }

  private createAdminUserGroup() {
    new CfnUserPoolGroup(this, 'SpaceAdmins', {
      userPoolId: this.userPool.userPoolId,
      groupName: 'space-admins',
    });
  }

  private createIdentityPool() {
    new CfnIdentityPool(this, 'SpaceIdentityPool', {
      allowUnauthenticatedIdentities: true,
      allowClassicFlow: true,
      cognitoIdentityProviders: [
        {
          clientId: this.userPoolClient.userPoolClientId,
          providerName: this.userPool.userPoolProviderName,
        },
      ],
    });

    new CfnOutput(this, 'SpaceIdentityPoolId', {
      value: this.userPoolClient.userPoolClientId,
    });
  }
}
