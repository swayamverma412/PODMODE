// import googleStorage from "@google-cloud/firestore"
import { Storage } from "@google-cloud/storage";
import Multer from "multer";
// const { googleStorage } = require("@google-cloud/storage");
// const Multer = require("multer");

export const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename:
    "./firebase/service/flipr-hackathon-3edc1-firebase-adminsdk-5zb03-6756eb6379.json",
});

export const bucket = storage.bucket("FLIPER_NOTICE_US");
export const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

export const uploadFileToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No image file");
    }
    let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (error) => {
      reject("Something is wrong! Unable to upload at the moment.");
    });

    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
};
