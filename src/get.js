import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * Get
 * @description - Allows the user to get a single diary entry.
 * @returns - JSON representing a diary entry.
 */
export async function main(event) {
  const params = {
    // Get the table name from the environment variable
    TableName: process.env.tableName,
    // Get the row where the entryId equals the one in the path e.g. /entries/{id}
    Key: {
      userId: event.requestContext.authorizer.jwt.claims.sub,
      entryId: event.pathParameters.id,
    },
  };
  const results = await dynamoDb.get(params).promise();

  // Return the entry, or an error if no matching entry was found
  return results.Item
    ? {
        statusCode: 200,
        body: JSON.stringify(results.Item),
      }
    : {
        statusCode: 404,
        body: JSON.stringify({
          error: { message: "Sorry, we couldn't find that diary entry" },
        }),
      };
}
