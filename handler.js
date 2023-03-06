"use strict";

const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

// We will extract email from the token, when we add authorization
const userEmail = "test@email.com";

module.exports.addNote = async (event) => {
  const { noteText } = event.body;

  const item = {
    userEmail,
    noteDate: new Date().getTime(),
    noteText,
  };

  const params = {
    TableName: "NoteTable",
    Item: item,
  };

  try {
    await documentClient.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Note added successfully" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Cannot add note", error: err }),
    };
  }
};

module.exports.deleteNote = async (event) => {
  const { noteDate } = event.pathParameters;

  const params = {
    TableName: "NoteTable",
    Key: {
      userEmail,
      noteDate,
    },
  };

  try {
    await documentClient.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Note deleted successfully" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Cannot delete note", error: err }),
    };
  }
};

module.exports.getAllNotes = async (event) => {
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
      body: JSON.stringify({ notes }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Cannot fetch notes", error: err }),
    };
  }
};
