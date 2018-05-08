// import entire SDK
var AWS = require('aws-sdk');
// Set credentials and region
AWS.config.update({region: 'us-west-1', credentials: {YOUR_CREDENTIALS}});
// import individual service
var S3 = require('aws-sdk/clients/s3');

var bucket = new S3({
		 endpoint: 's3-us-east-1.amazonaws.com',
		 signatureVersion: 'v4',
		 region: 'us-east-1',
		 params: {Bucket: 'freer-studio'}
});
