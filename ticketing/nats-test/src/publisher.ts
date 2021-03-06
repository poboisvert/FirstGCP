import nats from "node-nats-streaming";

// Documentation use stan
const client = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

// Open the ClusterIP on a specific port (4222)
// kubectl port-forward """nats-depl-6b89f95f9b-9rmrs""" 4222:4222
// Use image: nats-streaming
client.on("connect", () => {
  console.log("Publisher connected to NATS");

  // Data sharing & JSONIFY
  const data = JSON.stringify({
    id: "111",
    title: "concert",
    price: 20,
  });

  // Data is not mandatory
  client.publish("ticket:created", data, () => {
    console.log("Event published");
    // use rs in publisher terminal to see the activity
  });
});
