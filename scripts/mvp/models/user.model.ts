import { User, UserRepository } from "../repositories/user.repository";
import { IntentEvent, StateChangeEvent } from "../util/MVPEvent";
import { Model } from "./model.generic";

export class ModelUser extends Model<User> {
  constructor(name: string, private users: UserRepository) {
    super(name);
  }

  public getState(): User {
    return this.users.getOneUser();
  }
  public handleIntent(event: IntentEvent, newState: User): void {

    if (event == IntentEvent.DISPLAY){
      const user = this.users.getOneUser();
      this.fireStateChange(StateChangeEvent.LOADED, user);
    }

    if (event == IntentEvent.UPDATE) {
      const user = this.users.getOneUser();
      user.firstName = newState.firstName;
      user.lastName = newState.lastName;
      user.fullName = newState.fullName;

      this.fireStateChange(StateChangeEvent.UPDATED, user);
    }
  }
}