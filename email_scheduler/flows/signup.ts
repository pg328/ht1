import { Flow } from "../types/flows";

const signupFlow: Flow = {
  trigger: "websiteSignUp",
  actions: [
    {
      type: "email",
      subject: "Welcome Email!",
      body: "Thank you for signing up!",
      // delay: 2 * 60 * 60 * 1000, // 2 Hours
      delay: 2 * 1000, // 2 Seconds
    },
  ],
};

export default signupFlow;
