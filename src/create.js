import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * Create
 * @description - Allows the user to create a new diary entry.
 * @returns - the newly created diary entry.
 * Each valid submission creates a new row in the DynamoDB table.
 */
export async function main(event) {
  // get the content of the entry
  const data = JSON.parse(event.body);

  const params = {
    // Get the table name from the environment variable
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.authorizer.jwt.claims.sub,
      entryId: data.entryId, // an ISO date (user can only have one entry per day)
      content: data.content,
      createdAt: Date.now(),
    },
  };
  await dynamoDb.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
  };
}
