require("dotenv").config();
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const putObjectInS3 = async (filename, contentType) => {
  try {
    let keyy;
    if (contentType.startsWith("image/")) {
      keyy = `signup-images/${filename}`;
    } else {
      return { result: "error", message: "invalid content-type" };
    }

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: keyy,
      ContentType: contentType,
    });

    let url = await getSignedUrl(client, command);

    return {
      result: "success",
      url: url,
      key: keyy,
    };
  } catch (err) {
    return { result: "error", message: err.message };
  }
};

const getObjectInS3=async(keyy)=>{

  try{

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: keyy,
  });


  const url=await getSignedUrl(client,command,{expiresIn:3600});

  return url;

}
catch(err){
   return {
    result:"error",
    message:err.message
   }
}



}

module.exports = { putObjectInS3,getObjectInS3};
