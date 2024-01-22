import { SET_DATE, SET_DATE_MONTH_YEAR } from "../actiontypes";

const date = new Date();

const initialState = {
  day: date.getDay(),
  month: date.getMonth() + 1,
  year: date.getFullYear(),
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_DATE_MONTH_YEAR: {
      const { day, month, year } = payload;
      return {
        ...state,
        day,
        month,
        year,
      };
    }
    case SET_DATE: {
      const { day } = payload;
      return {
        ...state,
        day,
      };
    }
    default:
      return state;
  }
}
