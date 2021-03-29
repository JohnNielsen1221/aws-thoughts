const { v4: uuidv4 } = require('uuid') // Generates a unique 36-character alphanumeric string to name image files

// function to configure file
const params = fileName => { // Received fileName from Express route
  const myFile = fileName.originalname.split('.')
  const fileType = myFile[myFile.length - 1]

  const imageParams = {
    Bucket: '<My_Bucket_Name>',
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer
  }

  return imageParams
}

module.exports = params
