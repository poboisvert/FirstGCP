import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

// Documentation use stan
// randomBytes(4), we can now have many listener with different ID
const client = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

// Open the ClusterIP on a specific port (4222)
// kubectl port-forward """nats-depl-6b89f95f9b-9rmrs""" 4222:4222
// Use image: nats-streaming
client.on("connect", () => {
  console.log("Listener connected to NATS");

  // Subscription to a specific event
  // setDeliverAllAvailable() - setManualAckMode - setMaxInFlight, etc
  // Processing/code to run to filter the message then acknowledge manually like 30 sec and if not done will sent it by default.
  const options = client.subscriptionOptions().setManualAckMode(true);
  const subscription = client.subscribe(
    "ticket:created",
    "orders-service-queue-group",
    options
  );
  // NO () => {} like in ES6

  // NATS Listener and use a sub
  // "CMD + Click" on "Message" to see the fonctionality
  subscription.on("message", (msg: Message) => {
    // console.log("Message received");
    // use rs in publisher terminal to see the activity
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(
        `received event ID: ${msg.getSequence()}, and it says ${data}`
        // received event ID: 7, and it says {"id":"111","title":"concert","price":20}
      );
    }
    msg.ack(); // to reply a manual confirmation to setManualAckMode(true);
  });
});
