import express from "express";

import {
  acceptConnectionRequest,
  discoverUsers,
  followUser,
  getUserConnections,
  getUserData,
  getUserProfiles,
  sendConnectionRequest,
  unfollowUser,
  updateUserData
} from "../controllers/userController.js";

import { protect } from "../middlewares/auth.js";
import { upload } from "../configs/multer.js";
import { getUserRecentMessages } from "../controllers/messageController.js";

const userRouter = express.Router();

/* User data */
userRouter.get("/data", protect, getUserData);

/* Update profile */
userRouter.post(
  "/update",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 }
  ]),
  protect,
  updateUserData
);

/* Discover & follow */
userRouter.post("/discover", protect, discoverUsers);
userRouter.post("/follow", protect, followUser);
userRouter.post("/unfollow", protect, unfollowUser);

/* Connections */
userRouter.post("/connect", protect, sendConnectionRequest);
userRouter.post("/accept", protect, acceptConnectionRequest);
userRouter.get("/connections", protect, getUserConnections);

/* Profiles */
userRouter.post("/profiles", getUserProfiles);

/* Messages */
userRouter.get("/recent-messages", protect, getUserRecentMessages);

export default userRouter;
