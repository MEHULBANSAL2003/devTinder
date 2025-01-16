require("dotenv").config();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
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
      keyy = `signup-images/${Date.now()}-${filename}`;
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
      key: process.env.AWS_CLOUDFRONT_DOMAIN + "/" + keyy,
    };
  } catch (err) {
    return { result: "error", message: err.message };
  }
};

module.exports = { putObjectInS3 };
