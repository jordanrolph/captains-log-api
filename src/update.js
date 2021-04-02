import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * Update
 * @description - Allows the user to update a given diary entry.
 * @returns - JSON representing the updated diary entry.
 */
export async function main(event) {
  const data = JSON.parse(event.body);

  const params = {
    // Get the DynamoDB table's name from the environment variable
    TableName: process.env.tableName,
    // Get the row where the entryId equals the one in the path e.g. /entries/{id}
    Key: {
      userId: "123", // TODO - replace with authenticated user's ID
      entryId: event.pathParameters.id,
    },
    // Update the "content" column with the one passed in
    UpdateExpression: "SET content = :content",
    ExpressionAttributeValues: {
      ":content": data.content || null,
    },
    ReturnValues: "ALL_NEW", // returns the entire row post update
  };

  const results = await dynamoDb.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Attributes),
  };
}
