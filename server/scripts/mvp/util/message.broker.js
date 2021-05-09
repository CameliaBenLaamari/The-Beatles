"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Broker = void 0;
class Broker {
    constructor() {
        this.topics = {};
    }
    static getInstance() {
        if (!Broker.instance) {
            Broker.instance = new Broker();
        }
        return Broker.instance;
    }
    subscribe(topic, callback) {
        if (topic && !this.topics[topic]) {
            this.topics[topic] = [];
        }
        this.topics[topic].push(callback);
    }
    unsubscribe(topic, callback) {
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
    publish(topic, msg) {
        let v = this.topics[topic];
        if (v != null && typeof v !== "undefined") {
            for (var i = 0; i < v.length; ++i) {
                var callback = v[i];
                callback(msg);
            }
        }
    }
}
exports.Broker = Broker;
//# sourceMappingURL=message.broker.js.map