const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk')

const awsConfig = {
  region: 'us-east-2',
  endpoint: 'http://localhost:8000'

}

AWS.config.update(awsConfig)
const dynamodb = new AWS.DynamoDB.DocumentClient()
const table = 'Thoughts'

// get users thoughts
router.get('/users', (req, res) => {
  const params = {
    TableName: table
  }
  // Scan return all items in the table
  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.status(500).json(err) // if error occured
    } else {
      res.json(data.Items)
    }
  })
})

// Pass username from client to server
router.get('/users/:username', (req, res) => {
  console.log(`Querying for thought(s) from ${req.params.username}.`)
  const params = {
    TableName: table,
    KeyConditionExpression: '#un = :user', // Specifies search criteria
    ExpressionAttributeNames: {
      '#un': 'username', // the # prefix establishes that this is an attribute name alias
      '#ca': 'createdAt',
      '#th': 'thought'
    },
    ExpressionAttributeValues: {
      ':user': req.params.username // The : establishes that this is an attribute value alias
    },
    ProjectionExpression: '#th, #ca', // Determines which Attribus (columns) will be returned
    ScanIndexForward: false // Specifies order of sort key. Default is true, which would be ascending
  }
  // Retrieve single user's thoughts from database
  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2))
      res.status(500).json(err)
    } else {
      console.log('Query succeeded.')
      res.json(data.Items) // Response data from the database is located in the Items property
    }
  })
})

// Create Post route for new thought
router.post('/users', (req, res) => {
  const params = {
    TableName: table,
    Item: {
      username: req.body.username,
      createdAt: Date.now(),
      thought: req.body.thought
    }
  }
  // database call
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2))
      res.status(500).json(err)
    } else {
      console.log('Added item:', JSON.stringify(data, null, 2))
      res.json({'Added': JSON.stringify(data, null, 2)})
    }
  })
})

module.exports = router
