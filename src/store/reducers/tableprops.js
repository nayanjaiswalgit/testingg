import {
  CLEAR_FILTER_VALUES,
  SET_BUTTON_STATE,
  SET_PAGINATION_LIMIT,
  SET_PAGINATION_OFFSET,
  SET_SEARCH_VALUES,
  UPDATE_SEARCH_TEXT,
} from "../actiontypes";

const buttonInitialState = {
  rejected: false,
  blacklisted: false,
  shortlistround1: false,
  offered: false,
  new: false,
  codetest: false,
  testscheduled: false,
  testcompleted: false,
  round1: false,
  shortlistround2: false,
  round2: false,
  shortlistround3: false,
  round3: false,
  hrround: false,
  shortlistoffer: false,
  offeraccepted: false,
  joined: false,
  onhold: false,
};

const initialState = {
  ...buttonInitialState,
  set_table_data: null,
  searchText: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PAGINATION_LIMIT: {
      const { id, limit, offset } = payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          limit,
          offset,
        },
      };
    }

    case SET_PAGINATION_OFFSET: {
      const { id, offset } = payload;
      return {
        ...state,

        [id]: {
          ...state[id],
          offset,
        },
      };
    }

    case SET_SEARCH_VALUES: {
      const { id, ...params } = payload;
      return {
        ...state,
        [id]: {
          limit: state[id].limit,
          offset: state[id].offset,
          ...params,
        },
      };
    }

    case CLEAR_FILTER_VALUES: {
      return {
        ...state,
        ...buttonInitialState,
      };
    }

    case UPDATE_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.payload,
      };
    }

    case SET_BUTTON_STATE: {
      const { key, selected } = payload;
      return {
        ...state,
        ...buttonInitialState,
        [key]: selected,
        set_table_data: selected ? key : null,
      };
    }
    default:
      return state;
  }
}
