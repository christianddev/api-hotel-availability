export const throwError = (message: string, error: unknown): undefined => {
  console.trace(`${message}: `, error);
  throw error;
};
