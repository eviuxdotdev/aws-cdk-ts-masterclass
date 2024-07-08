import { Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { join } from 'path';

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    new Function(this, 'HelloWorldFunction', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'hello.handler',
      code: Code.fromAsset(join(__dirname, '..', '..', 'services')),
    });
  }
}
