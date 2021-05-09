import { User } from "../repositories/user.repository";
import { StateChangeEvent } from "../util/MVPEvent";
import { View } from "./view.generic";

var fs = require('fs').promises;

export class ViewUser extends View<User> {
  private user: User;

    constructor(name: string) {
      super(name);
    }
  
    public async render(): Promise<any> {
      let filePath = process.cwd() + '//index.html';
      const data = await fs.readFile(filePath);
      return (data.toString().replace(/NAME_PLACEHOLDER/, this.user.fullName));
    }

    public handleStateChange(event: StateChangeEvent, newState: User): void {
      if( event == StateChangeEvent.LOADED){
        this.user = newState;
      }
      if (event == StateChangeEvent.UPDATED) {
        this.user.firstName = newState.firstName;
        this.user.lastName = newState.lastName;
        this.user.fullName = newState.fullName;
      }

      this.render();
    }
  }