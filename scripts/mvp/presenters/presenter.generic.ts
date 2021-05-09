import { Model } from "../models/model.generic";
import { Broker } from "../util/message.broker";
import { IntentEvent, MVPEvent, StateChangeEvent } from "../util/MVPEvent";
import { View } from "../views/view.generic";

export class Presenter<T, V extends View<T>, M extends Model<T>> {
  protected _view!: V;
  protected _model!: M;

  protected get view(): V {
    return this._view;
  }

  protected get model(): M {
    return this._model;
  }
  
  public attach(view: V, model: M): void {
    this._view = view;
    this._view.relatedModel = model;

    this._model = model;
    this._model.relatedView = view;

    Broker.getInstance().subscribe(this._view.topic, this.updateModel);

    Broker.getInstance().subscribe(this._model.topic, this.updateView);
  }

  public detach() {
    Broker.getInstance().unsubscribe(this._view.topic, this.updateModel);
    Broker.getInstance().unsubscribe(this._model.topic, this.updateView);
  }
  
  public updateModel(msg: any): void {
    if (msg instanceof MVPEvent && msg.isIntent()) {
      msg.caller.handleIntent(msg.event as IntentEvent, msg.state);
    }
  }

  public updateView(msg: any): void {
    if (msg instanceof MVPEvent && msg.isStateChange()) {
      msg.caller.handleStateChange(msg.event as StateChangeEvent, msg.state);
    }
  }
}