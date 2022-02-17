import { makeAutoObservable } from "mobx";

export interface IErrorStore {
  readonly error: string | null;
  clear(): void;
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

  public clear(): void {
    this._error = null;
  }

  public setError(err: string): void {
    this._error = err;
  }
}

export function newErrorStore(): IErrorStore {
  return new ErrorStore();
}
