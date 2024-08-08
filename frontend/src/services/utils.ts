import moment from "moment";

export const getStayLength = (dateIn: Date, dateOut: Date): number => {
  const start = moment(dateIn);
  const end = moment(dateOut);
  const diffDays = end.diff(start, "days");
  return diffDays <= 0 ? 1 : diffDays;
};
