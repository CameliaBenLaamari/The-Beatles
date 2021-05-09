export class Broker {
  private static instance: Broker;
  private topics: { [key in string]?: { (msg: any): void }[] };
  private constructor() {
    this.topics = {};
  }

  public static getInstance(): Broker {
    if (!Broker.instance) {
      Broker.instance = new Broker();
    }
    return Broker.instance;
  }
 
  public subscribe(topic: string, callback: (msg: any) => void): void {
    if (topic && !this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(callback);
  }

  public unsubscribe(topic: string, callback: (msg: any) => void): void {
    if (topic && !this.topics[topic]) {
      return;
    }

    this.topics[topic] = this.topics[topic].filter(function (x) {
      return x != callback;
    });

    if (!this.topics[topic].length) {
      delete this.topics[topic];
    }
  }
  public publish(topic: string, msg: any): void {
    let v = this.topics[topic];

    if (v != null && typeof v !== "undefined") {
      for (var i = 0; i < v.length; ++i) {
        var callback = v[i];
        callback(msg);
      }
    }
  }
}
