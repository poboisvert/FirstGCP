import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";

// Documentation use stan
// randomBytes(4), we can now have many listener with different ID
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

// Open the ClusterIP on a specific port (4222)
// kubectl port-forward """nats-depl-6b89f95f9b-9rmrs""" 4222:4222
// Use image: nats-streaming
stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS is now closed");
    process.exit();
  });

  // Function below
  new TicketCreatedListener(stan).listen();
});

// Watching to interruption or termination/close
// http://localhost:8222/streaming/channelsz?subs=1 is almost live on change listener Quantity on/live
process.on("SIGINT", () => {
  stan.close();
});

process.on("SIGTERM", () => {
  stan.close();
});
