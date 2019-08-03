"use strict";
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2" });

module.exports.update = async event => {
  const body = JSON.parse(event.body);

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

  // write to DynamoDb
  const dbResponse = docClient.put(params).promise();
  return dbResponse
    .then(() => {
      console.log("Success!");
      return {
        statusCode: 200,
        body: `${new Date().toLocaleString()} | Update Success`
      };
    })
    .catch(error => {
      console.log("Error!", JSON.stringify(error));
      return {
        statusCode: 400,
        error: `${new Date().toLocaleString()} | Error updating DynamoDB: ${
          error.stack
        }`
      };
    });
};
