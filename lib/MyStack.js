import * as cdk from "@aws-cdk/core";
import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    /**
     * Create a DynamoDB table to hold the diary entries
     */
    const table = new sst.Table(this, "Entries", {
      fields: {
        userId: sst.TableFieldType.STRING,
        entryId: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "userId", sortKey: "entryId" },
    });

    /**
     * Create the API
     */
    const api = new sst.Api(this, "Api", {
      defaultFunctionProps: {
        // Pass the DynamoDB table name to the API
        environment: {
          tableName: table.dynamodbTable.tableName,
        },
      },
      routes: {
        "GET    /entries": "src/list.main",
        "POST   /entries": "src/create.main",
        "GET    /entries/{id}": "src/get.main",
        "PUT    /entries/{id}": "src/update.main",
        "DELETE /entries/{id}": "src/delete.main",
      },
    });

    // Allow the API to access the DynamoDB table
    api.attachPermissions([table]);

    // Show API endpoint in output
    new cdk.CfnOutput(this, "ApiEndpoint", {
      value: api.httpApi.apiEndpoint,
    });
  }
}
