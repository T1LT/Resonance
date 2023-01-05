import { createConsumer } from "@rails/actioncable";

let wsUrl;
if (process.env.NODE_ENV !== "production") wsUrl = "ws://localhost:5000/cable";
else wsUrl = "/cable";

export default createConsumer(wsUrl);
