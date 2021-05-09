"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MVPEvent = exports.StateChangeEvent = exports.IntentEvent = void 0;
var IntentEvent;
(function (IntentEvent) {
    IntentEvent[IntentEvent["DISPLAY"] = 2] = "DISPLAY";
    IntentEvent[IntentEvent["CREATE"] = 4] = "CREATE";
    IntentEvent[IntentEvent["UPDATE"] = 8] = "UPDATE";
    IntentEvent[IntentEvent["DELETE"] = 16] = "DELETE";
    IntentEvent[IntentEvent["ADD"] = 32] = "ADD";
    IntentEvent[IntentEvent["REMOVE"] = 64] = "REMOVE";
})(IntentEvent = exports.IntentEvent || (exports.IntentEvent = {}));
var StateChangeEvent;
(function (StateChangeEvent) {
    StateChangeEvent[StateChangeEvent["LOADED"] = 128] = "LOADED";
    StateChangeEvent[StateChangeEvent["CREATED"] = 256] = "CREATED";
    StateChangeEvent[StateChangeEvent["UPDATED"] = 512] = "UPDATED";
    StateChangeEvent[StateChangeEvent["DELETED"] = 1024] = "DELETED";
    StateChangeEvent[StateChangeEvent["ADDED"] = 2048] = "ADDED";
    StateChangeEvent[StateChangeEvent["REMOVED"] = 4096] = "REMOVED";
})(StateChangeEvent = exports.StateChangeEvent || (exports.StateChangeEvent = {}));
class MVPEvent {
    constructor(event, state, caller) {
        this._event = event;
        this._state = state;
        this.caller = caller;
    }
    isIntent() {
        return this._event in IntentEvent;
    }
    isStateChange() {
        return this._event in StateChangeEvent;
    }
    get event() {
        return this._event;
    }
    get state() {
        return this._state;
    }
}
exports.MVPEvent = MVPEvent;
//# sourceMappingURL=MVPEvent.js.map