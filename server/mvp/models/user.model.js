"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelUser = void 0;
const MVPEvent_1 = require("../util/MVPEvent");
const model_generic_1 = require("./model.generic");
class ModelUser extends model_generic_1.Model {
    constructor(name, users) {
        super(name);
        this.users = users;
    }
    getState() {
        return this.users.getOneUser();
    }
    handleIntent(event, newState) {
        if (event == MVPEvent_1.IntentEvent.DISPLAY) {
            const user = this.users.getOneUser();
            this.fireStateChange(MVPEvent_1.StateChangeEvent.LOADED, user);
        }
        if (event == MVPEvent_1.IntentEvent.UPDATE) {
            const user = this.users.getOneUser();
            user.firstName = newState.firstName;
            user.lastName = newState.lastName;
            user.fullName = newState.fullName;
            this.fireStateChange(MVPEvent_1.StateChangeEvent.UPDATED, user);
        }
    }
}
exports.ModelUser = ModelUser;
//# sourceMappingURL=user.model.js.map