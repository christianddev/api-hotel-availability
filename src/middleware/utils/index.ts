export const getFirstTruthyValue = (
  ...values: Array<string | undefined | null>
): string => {
  for (const value of values) {
    if (value) {
      return String(value);
    }
  }
  return '';
};
