import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/user.controller.js";
import {
  addRecruitment,
  getRecruitmentsByClub,
} from "../controllers/recruitment.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
const router = Router();
router
  .route("/register")
  .post(upload.fields([{ name: "idCard", maxCount: 1 }]), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/currentUser").get(verifyJWT, getCurrentUser);
router.route("/addRecruitment").post(verifyJWT, addRecruitment);
router.route("/getRecruitmentsByClub").post(verifyAdmin, getRecruitmentsByClub);

export default router;
