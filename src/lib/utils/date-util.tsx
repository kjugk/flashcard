import dayjs from "dayjs";

export const numberToDateString = (date: number, format = "YYYY/MM/DD") =>
  dayjs(date).format(format);
