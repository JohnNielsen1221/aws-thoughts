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

module.exports = router
