import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * Delete
 * @description - Deletes a given diary entry for a user.
 * @returns - a status message.
 */
export async function main(event) {
  const params = {
    // Get the table name from the environment variable
    TableName: process.env.tableName,
    // Get the row where the entryId is the one in the path
    Key: {
      userId: "123",
      entryId: event.pathParameters.id,
    },
  };
  await dynamoDb.delete(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
}
