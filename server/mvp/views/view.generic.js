"use strict";
// This is an abstract class, we will derive from here when we will create a view
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const MVPEvent_1 = require("../util/MVPEvent");
const observable_generic_1 = require("../util/observable.generic");
class View extends observable_generic_1.Observable {
    constructor(name) {
        super(name + "Version#" + View.version.toString(32));
        ++View.version;
    }
    fireIntent(event, newState) {
        this.notify(new MVPEvent_1.MVPEvent(event, newState, this.relatedModel));
    }
}
exports.View = View;
View.version = 0;
//# sourceMappingURL=view.generic.js.map