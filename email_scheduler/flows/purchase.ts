import events from "../events";
import { Flow } from "../types/flows";

const socksPurchased: Flow = {
  trigger: "socksPurchased",
  actions: [
    {
      type: "email",
      subject: "Payment Received",
      body: "We have received your payment for the socks. Thank you for your purchase!",
    },
    {
      type: "email",
      subject: "Socks Dispatched",
      body: "Good news! Your socks have been dispatched and are on their way to you.",
    },
  ],
};

export default socksPurchased;
