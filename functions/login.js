const AWS = require("aws-sdk");
const Cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  // YOUR CODE HERE

  try {
    // AND HERE
    return {
      statusCode: 200,
      body: JSON.stringify({}),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error registering user" }),
    };
  }
};
