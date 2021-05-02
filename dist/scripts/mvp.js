"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Presenter = exports.Model = void 0;

class Model extends Observable {
    constructor(name) {
        super(name + "Version#" + Model.version.toString(32));
        ++Model.version;
    }

    fireStateChange(event, newState) {
        this.notify(new MVPEvent(event, newState));
    }
}
exports.Model = Model;

Model.version = 0;

class Presenter {
    get view() {
        return this._view;
    }
    get model() {
        return this._model;
    }

    attach(view, model) {
        this._view = view;
        this._model = model;

        Broker.getInstance().subscribe(this._view.topic, this.updateModel);
        Broker.getInstance().subscribe(this._model.topic, this.updateView);
    }

    detach() {
        Broker.getInstance().unsubscribe(this._view.topic, this.updateModel);
        Broker.getInstance().unsubscribe(this._model.topic, this.updateView);
    }

    updateModel(msg) {
        if (msg instanceof MVPEvent && msg.isIntent()) {
            this._model.handleIntent(msg.event, msg.state);
        }
    }

    updateView(msg) {
        if (msg instanceof MVPEvent && msg.isStateChange()) {
            this._view.handleStateChange(msg.event, msg.state);
        }
    }
}
exports.Presenter = Presenter;