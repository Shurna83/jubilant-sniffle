export interface Left<A> {
  value: A;
  tag: "left";
}

export interface Right<B> {
  value: B;
  tag: "right";
}

export type Either<A, B> = Left<A> | Right<B>;

export function isLeft(val: Either<unknown, unknown>): val is Left<unknown> {
  return (val as Left<unknown>).tag === "left";
}

export function isRight(val: Either<unknown, unknown>): val is Right<unknown> {
  return (val as Right<unknown>).tag === "right";
}

export function left<A>(val: A): Left<A> {
  return { value: val, tag: "left" };
}

export function right<B>(val: B): Right<B> {
  return { value: val, tag: "right" };
}
