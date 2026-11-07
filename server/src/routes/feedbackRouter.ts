import { Router } from "express";
import feedbackController from "../controllers/feedbackController.js";

const feedbackRouter = Router();

// Public: no login needed to send feedback.
feedbackRouter.post("/", feedbackController.submitFeedback);

export default feedbackRouter;
