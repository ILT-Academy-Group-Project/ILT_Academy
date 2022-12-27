const express = require('express');
const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();



//AWS S3 BUCKET VARIABLES
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region:region
});


//s3 upload fn
const uploadImage=(file)=>{
    const fileStream 
            =fs.createReadStream(file.path);

    const params = {
        Bucket: bucketName,
        Key: file.filename,
        Body: fileStream,
    };

    return new Promise((resolve, reject) =>{
        s3.upload(params, function (err, data) {
        console.log(data)
        if (err) {
            throw err
        }
        // console.log(`File uploaded successfully. 
        //                 ${data.Location}`);
        resolve(data.Location);
    })});
}

module.exports=uploadImage;