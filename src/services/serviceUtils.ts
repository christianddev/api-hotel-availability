export const throwError = (message: string, error: unknown): Error => {
  console.trace(`${message}: `, error);
  throw new Error(message);
};
