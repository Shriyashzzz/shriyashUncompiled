import type { Request, Response, NextFunction } from "express";
import { body, validationResult, matchedData } from "express-validator";
import { AppError } from "../ultility/error.js";
import { redisConnection } from "../config/redis.js";
import { EmailjobQueue } from "../jobs/newletter.job.js";
import "../workers/newsletter.worker.js";

// Where feedback can come from. Anything else is stored as "blog".
const SOURCES = ["blog", "calculus-book"];

// At most RATE_LIMIT submissions per IP per RATE_WINDOW_SECONDS.
const RATE_LIMIT = 5;
const RATE_WINDOW_SECONDS = 60 * 60;

const validationFeedback = [
  body("name").optional({ values: "falsy" }).trim().isLength({ max: 100 }),
  body("email").optional({ values: "falsy" }).trim().isEmail(),
  body("message").trim().isLength({ min: 5, max: 5000 }),
  body("source").optional().trim().isString(),
  // Honeypot: hidden from humans in the UI, so bots are the only ones filling it.
  body("website").optional().isString(),
];

const submitFeedback = [
  ...validationFeedback,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError("Invalid feedback", 400));
    }

    const { name, email, message, source, website } = matchedData(req);

    // Pretend it worked so bots don't learn about the trap.
    if (website) {
      return res.status(200).json({ message: "Thanks for the feedback!" });
    }

    try {
      const key = `feedback:ip:${req.ip}`;
      const count = await redisConnection.incr(key);
      if (count === 1) await redisConnection.expire(key, RATE_WINDOW_SECONDS);
      if (count > RATE_LIMIT) {
        return next(
          new AppError("Too much feedback at once, try again later", 429),
        );
      }

      await EmailjobQueue.add(
        "send-feedback",
        {
          name,
          email,
          message,
          source: SOURCES.includes(source) ? source : "blog",
        },
        {
          attempts: 3,
          backoff: { type: "exponential", delay: 5000 },
          removeOnComplete: true,
          removeOnFail: { age: 24 * 3600 },
        },
      );
      return res.status(200).json({ message: "Thanks for the feedback!" });
    } catch (e) {
      return next(new AppError("Unable to send feedback", 500, false));
    }
  },
];

export default { submitFeedback };
