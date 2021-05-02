import { IntentEvent, MVPEvent, StateChangeEvent } from "../util/MVPEvent";
import { Observable } from "../util/observable.generic";
import { View } from "../views/view.generic";

export abstract class Model<T> extends Observable {
  relatedView: View<T>;

  private static version: number = 0;
  constructor(name: string) {
    super(name + "Version#" + Model.version.toString(32));
    ++Model.version;
  }
  
  public fireStateChange(event: StateChangeEvent, newState: T) {
    this.notify(
      new MVPEvent<T>(event as IntentEvent | StateChangeEvent, newState, this.relatedView)
    );
  }
  
  public abstract getState(): T;

  public abstract handleIntent(event: IntentEvent, newState: T): void;
}