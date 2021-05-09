"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const MVPEvent_1 = require("../util/MVPEvent");
const observable_generic_1 = require("../util/observable.generic");
class Model extends observable_generic_1.Observable {
    constructor(name) {
        super(name + "Version#" + Model.version.toString(32));
        ++Model.version;
    }
    fireStateChange(event, newState) {
        this.notify(new MVPEvent_1.MVPEvent(event, newState, this.relatedView));
    }
}
exports.Model = Model;
Model.version = 0;
//# sourceMappingURL=model.generic.js.map