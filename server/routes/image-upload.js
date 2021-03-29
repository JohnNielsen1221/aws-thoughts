const express = require('express')
const router = express.Router()
const multer = require('multer') // Provide middleware for handling multipart/form-data used for uploading files. Adds file property on req object
const AWS = require('aws-sdk')
const paramsConfig = require('../utils/params-config')

// Create a temporrary storage container to hold image until reat to be uploaded to S3 bucket
const storage - multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, '')
  }
})

// Storage destination and key
const upload = multer({storage}).single('image')

// instantiate service object (s3) to communicate with S3 web serviice, allowing us to upload image to bucket
const s3 = new AWS.S3({
  apiVersion: '2006-03-01' // Lock version number in case default S3 version changes
})

router.post('/image-upload', upload, (req,res) => {
  console.log("post('/api/image-upload'", req.file)
  // params config
  const params = paramsConfig(req.file) // Retrieved image file object req.file from route using multer. Assigned returned object from paramsConfig function to params object
  // S3 service call
  s3.upload(params, (err, data) => {
    if(err) {
      console.log(err)
      res.status(500).send(err)
    }
    res.json(data) // Send data retrieved from S3 bucket back to client. data will contain image file's metadata (URL, bucket name, file name, etc)
  })
})

module.exports = router