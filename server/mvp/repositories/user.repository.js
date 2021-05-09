"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = exports.User = void 0;
class User {
    constructor(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
exports.User = User;
class UserRepository {
    constructor() {
        this.users = [new User("Mohamed", "Bécha", "Kaaniche")];
    }
    getUsers() {
        return this.users;
    }
    getOneUser() {
        return this.users[0];
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map