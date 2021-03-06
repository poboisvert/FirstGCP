import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

// Apache Avro
// JSON Schema
// Protobuf

// Documentation use stan
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

// Open the ClusterIP on a specific port (4222)
// kubectl port-forward """nats-depl-6b89f95f9b-9rmrs""" 4222:4222
// Use image: nats-streaming
stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher = new TicketCreatedPublisher(stan);
  try {
    // ASYNC operation
    await publisher.publish({
      id: "123",
      title: "Party People",
      price: 42,
    });
  } catch (err) {
    console.log(err);
  }

  // Data sharing & JSONIFY
  /*   const data = JSON.stringify({
    id: "111",
    title: "concert",
    price: 20,
  });

  // Data is not mandatory
  client.publish("ticket:created", data, () => {
    console.log("Event published");
    // use rs in publisher terminal to see the activity
  }); */
});
