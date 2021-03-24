const AWS = require('aws-sdk')

// Modify AWS config object that Dynamo will use to connect to the local instance
AWS.config.update({
  region: 'us-east-2',
  endpoint: 'http://localhost:8000'
})

// Create DynamoDB service object
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })


