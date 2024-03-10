//
import { Router } from "express";
import prisma from "../db";
import { body, validationResult } from "express-validator";
import {
  createPodcast,
  getAllPodcast,
  getPodcastByUserId,
  viewAudio,
  getRecentPodcast,
  getPopularPodcast,
} from "../controllers/podcast";
const router = Router();
import { protect } from "../module/user";
//
import path from "path";
import saltedMd5 from "salted-md5";
import multer from "multer";
import admin from "firebase-admin";

var serviceAccount = require("../module/firebase/service/flipr-hackathon-3edc1-firebase-adminsdk-5zb03-6756eb6379.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.BUCKET_URL,
});

//

router.get("/", getAllPodcast);
router.get("/recent", getRecentPodcast);
router.get("/view/:id", viewAudio);
router.get("/podcastByUserId", protect, getPodcastByUserId);
router.get("/popular", getPopularPodcast);

router.post(
  "/upload-audio",
  protect,
  multer().single("file"),
  async (req, res) => {
    const file = (req as any).file;
    const userId = (req as any).user.user.id;
    console.log(file);

    // const { id } = req.user.user;
    const { name, description, type, speaker, duration, category } = req.body;

    let downloadURL;
    try {
      const saltedName = saltedMd5(file.originalname, "SUPER-S@LT!");
      const fileName = saltedName + path.extname(file.originalname);
      const bucket = admin.storage().bucket();

      const audioFileRef = bucket.file(`audio/${fileName}`);
      await audioFileRef.save(file.buffer);

      // Get download URL of uploaded audio file
      downloadURL = await audioFileRef.getSignedUrl({
        action: "read",
        expires: "03-17-25",
      });
      if (!downloadURL) {
        return res.status(404).json({ message: "DownloadURL not found" });
      }

      // Send download URL as response

      // await bucket.file(fileName).createWriteStream().end(file.buffer);
    } catch (err) {
      return res.status(500).json({ message: "Error while uploading file" });
    }

    try {
      console.log({
        name,
        description,
        type,
        speaker,
        duration,
        category,
        file: downloadURL[0],
        userId,
      });
      const podcast = await prisma.podcast.create({
        data: {
          name,
          description,
          type,
          speaker,
          duration: Number(duration),
          category,
          file: downloadURL[0],
          userId,
        },
      });

      return res.json({ podcast });
    } catch (err) {
      return res.json({ message: "Error while saving data into databse" });
    }
  }
);

// router.post("/", multer.single("podcast"), createPodcast);
router.get("/search", (req, res) => {});

export default router;
