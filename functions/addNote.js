"use strict";

const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

// We will extract email from the token, when we add authorization
const userEmail = "test@email.com";

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { noteText } = body;

  const item = {
    noteText,
    userEmail,
    noteDate: new Date().getTime(),
  };

  const params = {
    TableName: "NoteTable",
    Item: item,
  };

  try {
    await documentClient.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Note added successfully",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Cannot add note",
        error: err,
      }),
    };
  }
};
