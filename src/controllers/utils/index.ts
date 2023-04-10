/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable promise/param-names */
export const getDateFormatted = (currentDate: Date): string => {
  const date = new Date(currentDate);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};
