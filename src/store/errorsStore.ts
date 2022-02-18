import { makeAutoObservable } from "mobx";

export interface IErrorStore {
  readonly error: string | null;
  setError(err: string): void;
}

class ErrorStore implements IErrorStore {
  private _error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public get error(): string | null {
    return this._error;
  }

  public setError(err: string): void {
    this._error = err;
  }
}

export function newErrorStore(): IErrorStore {
  return new ErrorStore();
}
