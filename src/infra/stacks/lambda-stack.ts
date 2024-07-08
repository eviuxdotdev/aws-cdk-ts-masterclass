import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { join } from 'path';

interface LambdaStackProps extends StackProps {
  spacesTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly helloLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);
    const helloLambda = new Function(this, 'HelloWorldFunction', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'hello.handler',
      code: Code.fromAsset(join(__dirname, '..', '..', 'services')),
      environment: {
        SPACES_TABLE: props.spacesTable.tableName,
      },
    });

    this.helloLambdaIntegration = new LambdaIntegration(helloLambda);
  }
}
