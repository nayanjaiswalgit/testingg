import { SET_DATE, SET_DATE_MONTH_YEAR } from "../actiontypes";

export const updateSearchDate = (props) => ({
  type: SET_DATE_MONTH_YEAR,
  payload: { ...props },
});

export const updateSearchDay = (props) => ({
  type: SET_DATE,
  payload: { ...props },
});
