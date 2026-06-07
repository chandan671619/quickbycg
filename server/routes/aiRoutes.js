console.log("AI Routes Loaded");
import express from "express";
import { generateArticle , generateimage , Blogtitle , resumeReview , removebackground , removeImageObject} from "../controllers/aiControllers.js";
import upload from "../configs/multer.js";
const aiRouter = express.Router();

aiRouter.get("/test", (req, res) => {
  res.json({ success: true, message: "AI Route Working" });
});

aiRouter.post("/generate-article", generateArticle);
aiRouter.post("/generate-blog-title", Blogtitle);
aiRouter.post("/generate-image", generateimage);
aiRouter.post("/remove-background",upload.single("image"),removebackground);
aiRouter.post("/remove-image",upload.single("image"),removeImageObject);
aiRouter.post("/resume-review",upload.single("resume"),resumeReview);

export default aiRouter;