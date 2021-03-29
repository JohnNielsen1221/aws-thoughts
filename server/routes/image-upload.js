const express = require('express')
const router = express.Router()
const multer = require('multer') // Provide middleware for handling multipart/form-data used for uploading files. Adds file property on req object
const AWS = require('aws-sdk')

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
  // params config

  // S3 service call
  
})