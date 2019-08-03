"use strict";
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2" });

module.exports.update = async event => {
  const { body } = event;

  const params = {
    TableName: "GardenParty",
    Item: {
      plant: body.plant,
      temperature: body.temperature,
      humidity: body.humidity,
      moisture: body.moisture,
      timestamp: body.timestamp
    }
  };

  try {
    // write to DynamoDb
    const data = await docClient.put(params).promise();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    console.log("Error!", JSON.stringify(error));
    return {
      statusCode: 400,
      error: `Error updating DynamoDB: ${error.stack}`
    };
  }
};
