import nats, { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  abstract onMessage(
    data: {
      id: string;
      title: string;
      price: number;
    },
    msg: Message
  ): void;
  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  // Subscription to a specific event
  // setDeliverAllAvailable() - setManualAckMode - setMaxInFlight, etc
  // Processing/code to run to filter the message then acknowledge manually like 30 sec and if not done will sent it by default.

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable() // Get all events from past. Can be too heavy to load on a large applciation since it aggregate all queries
      .setManualAckMode(true) // Ack MODE
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName); // accounting-service to maintain the logs - setDurableName with setDeliverAllAvailable
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions() // If restart listener, the previous history is keep here
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
