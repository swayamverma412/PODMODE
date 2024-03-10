import prisma from "../db";
import admin from "firebase-admin";
import { uploadFileToStorage } from "../module/podcast";
import { bucket } from "../module/podcast";

export const getAllPodcast = async (req, res, next) => {
  try {
    const podcasts = await prisma.podcast.findMany();

    return res.json({ data: podcasts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getPodcastByUserId = async (req, res) => {
  // app.get('/users/:id/podcasts', async (req, res) => {
  console.log("USERRRRR", req.user.user);

  const { id } = req.user.user;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { Podcasts: true },
    });
    res.status(201).json({ data: user.Podcasts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
    // });
  }
};

export const createPodcast = async (req, res) => {
  const { id } = req.user.user;
  const { file, name, description, type, speaker, duration, category } = req;

  if (file) {
    uploadFileToStorage(file)
      .then(async (success) => {
        console.log(success);
      })
      .catch((error) => {
        console.log(error);

        return res.status(500).json({ message: "Something went wrong" });
      });
  }
};

export const viewAudio = async (req, res) => {
  const { id } = req.params;
  try {
    const podcast = await prisma.podcast.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
    console.log("viewed");

    res.json({ status: "viewed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Can" });
  }
};

export const getRecentPodcast = async (req, res) => {
  try {
    const podcasts = await prisma.podcast.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json({ podcasts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong while fetching the most recent podcast",
    });
  }
};

export const getPopularPodcast = async (req, res) => {
  try {
    const podcasts = await prisma.podcast.findMany({
      orderBy: {
        views: "desc",
      },
    });

    return res.json({ podcasts });

    //
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong while fetching most popular podcasts",
    });
  }
};
