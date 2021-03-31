const { v4: uuidv4 } = require('uuid') // Generates a unique 36-character alphanumeric string to name image files

// function to configure file
const params = fileName => { // Received fileName from Express route
  const myFile = fileName.originalname.split('.')
  const fileType = myFile[myFile.length - 1]

  const imageParams = {
    Bucket: 'user-images-4a88b81f-8bf2-4987-a7e1-9acb5f5e84b8', // Name of the already created bucket found in S3 console
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
    ACL: 'public-read' // allows read access to the file
  }

  return imageParams
}

module.exports = params
