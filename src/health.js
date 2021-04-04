/**
 * GET `/health`
 * Public route. No auth required to call.
 * @returns - a 200 response if all is ok
 */
export async function main() {
  return {
    statusCode: 200,
    body: "Yarrr!",
  };
}
