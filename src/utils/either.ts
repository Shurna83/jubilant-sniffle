export interface Left<A> {
  value: A;
  tag: "left";
}

export interface Right<B> {
  value: B;
  tag: "right";
}

export type Either<A, B> = Left<A> | Right<B>;

export function isLeft<A>(val: unknown): val is Left<A> {
  return (val as Left<A>).tag === "left";
}

export function isRight<B>(val: unknown): val is Right<B> {
  return (val as Right<B>).tag === "right";
}

export function left<A>(val: A): Left<A> {
  return { value: val, tag: "left" };
}

export function right<B>(val: B): Right<B> {
  return { value: val, tag: "right" };
}
