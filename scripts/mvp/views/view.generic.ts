// This is an abstract class, we will derive from here when we will create a view

import { Model } from "../models/model.generic";
import { IntentEvent, MVPEvent, StateChangeEvent } from "../util/MVPEvent";
import { Observable } from "../util/observable.generic";

export abstract class View<T> extends Observable {
  private static version: number = 0;

  relatedModel: Model<T>;

  constructor(name: string) {
    super(name + "Version#" + View.version.toString(32));
    ++View.version;
  }

  public fireIntent(event: IntentEvent, newState: T) {
    this.notify(
      new MVPEvent<T>(event as IntentEvent | StateChangeEvent, newState, this.relatedModel)
    );
  }

  public abstract render(): void;

  public abstract handleStateChange(event: StateChangeEvent, newState: T): void;
}