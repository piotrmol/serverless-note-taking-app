"use strict";

const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

// We will extract email from the token, when we add authorization
const userEmail = "test@email.com";

module.exports.handler = async (_event) => {
  const params = {
    TableName: "NoteTable",
    KeyConditionExpression: "userEmail = :userEmail",
    ExpressionAttributeValues: {
      ":userEmail": userEmail,
    },
  };
  try {
    const notes = await documentClient.query(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        notes,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Cannot fetch note",
        error: err,
      }),
    };
  }
};
