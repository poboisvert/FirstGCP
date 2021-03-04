import nats, { Message } from "node-nats-streaming";

// Documentation use stan
const client = nats.connect("ticketing", "123", {
  url: "http://localhost:4222",
});

// Open the ClusterIP on a specifi port (4222)
// kubectl port-forward """nats-depl-6b89f95f9b-9rmrs""" 4222:4222
// Use image: nats-streaming
client.on("connect", () => {
  console.log("Listener connected to NATS");

  // Subscription to a specific event
  const subscription = client.subscribe("ticket:created");
  // NO () => {}

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
  });
});
