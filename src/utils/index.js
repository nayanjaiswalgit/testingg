import { getMonthValue, getWeekDayValue } from "../constants";

export const getDateString = (date) => {
  const newDate = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return newDate;
};

export const getInterviewEndTime = (date) => {
  date.setTime(date.getTime() + 1 * 60 * 60 * 1000);
  return getDateString(date);
};

export const getInterviewTimimg = (idate) => {
  const currDate = new Date(idate);

  const interviewDay = getWeekDayValue[currDate.getDay()];
  const interviewMonth = getMonthValue[currDate.getMonth()];
  const interviewDate = currDate.getDate();
  const interviewTime = `${interviewDay}, ${interviewMonth} ${interviewDate} ,${getDateString(
    currDate,
  )} - ${getInterviewEndTime(currDate)}`;
  return interviewTime;
};
