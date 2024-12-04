import { emailQueue } from ".";
import { Action } from "./types/actions";
import { JobData } from "./types/JobData";

export const mockSendEmail = async (
  emailAddress: string,
  subject: string,
  text: string,
  success: boolean = true,
) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (success) console.log(`Email sent to ${emailAddress}:`, subject, text);
  else console.log("Email Failed to Send");
  return success;
};

export const enqueueJobs = async (actions: Action[], userEmail: string) => {
  for (let action of actions) {
    if (action.type === "email") {
      await emailQueue.add(
        { action, userEmail },
        { delay: action.delay || 0, removeOnComplete: true },
      );
    }
  }
};
