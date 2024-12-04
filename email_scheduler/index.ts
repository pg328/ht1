import Queue from "bull";
import type { Job, Queue as QueueType } from "bull";
import flows from "./flows/flows";
import express from "express";
import { JobData } from "./types/JobData";
import { enqueueJobs, mockSendEmail } from "./utils";
import { Flow } from "./types/flows";

const PORT = 3000;

const app = express();
app.use(express.json());

export const emailQueue: QueueType<JobData> = new Queue(
  "emailQueue",
  process.env.REDIS_URL || "redis://redis:6379",
);

emailQueue.on("error", (error) => {
  console.error("Redis connection error:", error);
});
emailQueue.on("completed", () => {
  console.error("Job Completed! Yay!");
});

emailQueue.process(async (job: Job<JobData>, done) => {
  const { action, userEmail } = job.data;

  if (action.type == "email") {
    const success = await mockSendEmail(userEmail, action.subject, action.body);
    if (!success) {
      // More appropriate error handling needed, calls for observability tools here
      done(new Error(`Email to ${userEmail} failed to send.`));
    }
  }
  done();
});

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});

app.post("/event", async (req: any, res: any) => {
  const { eventName, userEmail } = req.body;

  if (!flows[eventName]) {
    return res.status(404).json({ message: "No flow found for this event." });
  }

  const currentFlow: Flow = flows[eventName];
  enqueueJobs(currentFlow.actions, userEmail);

  res.status(200).json({ message: "Flow execution started." });
});
