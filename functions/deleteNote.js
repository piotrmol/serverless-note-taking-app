"use strict";

const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const middy = require("middy");
const { errorHandler } = require("../utils/errorHandler");

// We will extract email from the token, when we add authorization
const userEmail = "test@email.com";

module.exports.handler = middy(async (event) => {
  const { noteDate } = event.pathParameters;

  const params = {
    TableName: "NoteTable",
    Key: {
      userEmail,
      noteDate: +noteDate,
    },
  };
  try {
    await documentClient.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Note deleted successfully",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Cannot delete note",
        error: err,
      }),
    };
  }
}).use(errorHandler());
