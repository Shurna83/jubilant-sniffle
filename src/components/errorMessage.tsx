type ErrorMessageProps = { message: string };

export function ErrorMessage({ message }: ErrorMessageProps): JSX.Element {
  return <span>{message}</span>;
}
