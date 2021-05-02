export enum IntentEvent {
  DISPLAY = 1 << 1,
  CREATE = 1 << 2,
  UPDATE = 1 << 3,
  DELETE = 1 << 4,
  ADD = 1 << 5,
  REMOVE = 1 << 6,
}

export enum StateChangeEvent {
  LOADED = 1 << 7,
  CREATED = 1 << 8,
  UPDATED = 1 << 9,
  DELETED = 1 << 10,
  ADDED = 1 << 11,
  REMOVED = 1 << 12,
}

export class MVPEvent<T> {
  private readonly _event: IntentEvent | StateChangeEvent;
  private readonly _state: T;

  public caller: any;

  constructor(event: IntentEvent | StateChangeEvent, state: T,caller:any) {
    this._event = event;
    this._state = state;
    this.caller = caller;
  }

  public isIntent(): boolean {
    return this._event in IntentEvent;
  }
  public isStateChange(): boolean {
    return this._event in StateChangeEvent;
  }
  
  public get event() {
    return this._event;
  }
  public get state() {
    return this._state;
  }
}

