import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { addNews, getNews } from "../controllers/news.controller.js";
const router = Router();
router
  .route("/addNews")
  .post(verifyAdmin, upload.fields([{ name: "poster", maxCount: 1 }]), addNews);

router.route("/getNews").get(getNews);

export default router;
