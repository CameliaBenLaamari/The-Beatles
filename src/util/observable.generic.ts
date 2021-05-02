import { Broker } from "./message.broker";

export class Observable {
    protected readonly _topic: string;
    constructor(theTopic: string) {
      this._topic = theTopic;
    }

    protected notify(msg: any) {
      Broker.getInstance().publish(this._topic, msg);
    }
    public get topic(): string {
      return this._topic;
    }
  }
  