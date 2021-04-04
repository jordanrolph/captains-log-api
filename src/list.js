import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * List
 * @description - Allows the user to get all their diary entries.
 * @returns - a JSON list representing diary entries.
 */
export async function main(event) {
  const params = {
    // Get the DynamoDB table's name from the environment variable
    TableName: process.env.tableName,
    // All the rows where the userId equals the authenticated user's ID
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.authorizer.jwt.claims.sub,
    },
  };
  const results = await dynamoDb.query(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Items),
  };
}
