"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Presenter = void 0;
const message_broker_1 = require("../util/message.broker");
const MVPEvent_1 = require("../util/MVPEvent");
class Presenter {
    get view() {
        return this._view;
    }
    get model() {
        return this._model;
    }
    attach(view, model) {
        this._view = view;
        this._view.relatedModel = model;
        this._model = model;
        this._model.relatedView = view;
        message_broker_1.Broker.getInstance().subscribe(this._view.topic, this.updateModel);
        message_broker_1.Broker.getInstance().subscribe(this._model.topic, this.updateView);
    }
    detach() {
        message_broker_1.Broker.getInstance().unsubscribe(this._view.topic, this.updateModel);
        message_broker_1.Broker.getInstance().unsubscribe(this._model.topic, this.updateView);
    }
    updateModel(msg) {
        if (msg instanceof MVPEvent_1.MVPEvent && msg.isIntent()) {
            msg.caller.handleIntent(msg.event, msg.state);
        }
    }
    updateView(msg) {
        if (msg instanceof MVPEvent_1.MVPEvent && msg.isStateChange()) {
            msg.caller.handleStateChange(msg.event, msg.state);
        }
    }
}
exports.Presenter = Presenter;
//# sourceMappingURL=presenter.generic.js.map