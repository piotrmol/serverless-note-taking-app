'use strict';

module.exports.addNote = async (_event) => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Add note'
    })
  }
};

module.exports.deleteNote = async (_event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Delete note'
    })
  }
};

module.exports.getAllNotes = async (_event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Get all notes'
    })
  }
};