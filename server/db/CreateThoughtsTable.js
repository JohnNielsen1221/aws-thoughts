const AWS = require('aws-sdk')

// Modify AWS config object that Dynamo will use to connect to the local instance
AWS.config.update({
  region: 'us-east-2',
  endpoint: 'http://localhost:8000'
})

// Create DynamoDB service object
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

// Create params object that will hold the schema and metadata of the table
const params = {
  TableName: 'Thoughts',
  KeySchema: [
    { AttributeName: 'username', KeyType: 'HASH' }, // Partition Key
    { AttributeName: 'createdAt', KeyType: 'RANGE' } // Sort Key
  ],
  AttributeDefinitions: [
    { AttributeName: 'username', AttributeType: 'S' }, // Assigning data types to the attributes
    { AttributeName: 'createdAt', AttributeType: 'N' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10, // Assigning read/write maximum capacity
    WriteCapcityUnits: 10
  }
}

// Make a call to the DynamoDB instance and create a table
dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2))
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2))
  }
})
