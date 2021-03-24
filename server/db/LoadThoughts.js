const AWS = require('aws-sdk')
const fs = require('fs')

AWS.config.update({
  region: 'us-east-2',
  endpoint: 'http://localhost:8000'
})
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

// Use fs package to read users.json and assign object to allUsers
console.log('Importing thoughts into DynamoDB. Please wait.')
const allUsers = JSON.parse(fs.readFileSync('./server/seed/users.json', 'utf8')) // Path is relative to where the file is executed, not path between files

// Loop over the allUsers array and create the params object with the elements in the array
allUsers.forEach(user => {
  const params = {
    TableName: 'Thoughts',
    Item: {
      username: user.username,
      createdAt: user.createdAt,
      thought: user.thought
    }
  }
  // Make a call to the database with the service interface object (dynamodb)
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add thought', user.username, '. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.log('PutItem succeeded:', user.username)
    }
  })
})
