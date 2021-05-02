"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewUser = void 0;
const MVPEvent_1 = require("../util/MVPEvent");
const view_generic_1 = require("./view.generic");
var fs = require('fs').promises;
class ViewUser extends view_generic_1.View {
    constructor(name) {
        super(name);
    }
    async render() {
        let filePath = process.cwd() + '//index.html';
        const data = await fs.readFile(filePath);
        return (data.toString().replace(/NAME_PLACEHOLDER/, this.user.fullName));
    }
    handleStateChange(event, newState) {
        if (event == MVPEvent_1.StateChangeEvent.LOADED) {
            this.user = newState;
        }
        if (event == MVPEvent_1.StateChangeEvent.UPDATED) {
            this.user.firstName = newState.firstName;
            this.user.lastName = newState.lastName;
            this.user.fullName = newState.fullName;
        }
        this.render();
    }
}
exports.ViewUser = ViewUser;
//# sourceMappingURL=user.view.js.map