import { Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class DataStack extends Stack {
  public readonly spacesTable: ITable;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.spacesTable = new Table(this, 'SpacesTable', {
      partitionKey: {
        name: 'pk',
        type: AttributeType.STRING,
      },
      tableName: 'spaces',
    });
  }
}
