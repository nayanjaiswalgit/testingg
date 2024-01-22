import {
  CLEAR_FILTER_VALUES,
  REMOVE_SEARCH_VALUES,
  SET_BUTTON_STATE,
  SET_PAGINATION_LIMIT,
  SET_PAGINATION_OFFSET,
  SET_SEARCH_VALUES,
  UPDATE_SEARCH_TEXT,
} from "../actiontypes";

export const updateLimit = (props) => ({
  type: SET_PAGINATION_LIMIT,
  payload: { ...props },
});

export const updateOffset = (props) => ({
  type: SET_PAGINATION_OFFSET,
  payload: { ...props },
});

export const updateSearchValues = (props) => ({
  type: SET_SEARCH_VALUES,
  payload: { ...props },
});

export const removeSearchValue = (props) => ({
  type: REMOVE_SEARCH_VALUES,
  payload: { ...props },
});

export const clearFilterValues = (props) => ({
  type: CLEAR_FILTER_VALUES,
  payload: { ...props },
});

export const setButtonState = (key, selected) => ({
  type: SET_BUTTON_STATE,
  payload: { key, selected },
});

export const updateSearchText = (searchText) => ({
  type: UPDATE_SEARCH_TEXT,
  payload: searchText,
});
