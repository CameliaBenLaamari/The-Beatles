"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observable = void 0;
const message_broker_1 = require("./message.broker");
class Observable {
    constructor(theTopic) {
        this._topic = theTopic;
    }
    notify(msg) {
        message_broker_1.Broker.getInstance().publish(this._topic, msg);
    }
    get topic() {
        return this._topic;
    }
}
exports.Observable = Observable;
//# sourceMappingURL=observable.generic.js.map