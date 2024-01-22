import {
  ALL_CANDIDATES,
  CLOSE_DRAWER,
  SELECT_CANDIDATE,
  SELECT_SINGLE_CANDIDATE,
  SET_LOADING,
} from "../actiontypes";

const initialState = {
  Candidatelist: [],
  selectedlist: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_CANDIDATES:
      return {
        ...state,
        Candidatelist: payload,
        loading: false,
      };

    case SELECT_CANDIDATE:
      return {
        ...state,
        selectedlist: payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: payload,
        drawer: false,
      };

    case SELECT_SINGLE_CANDIDATE:
      return {
        ...state,
        selected: payload,
        drawer: true,
      };

    case CLOSE_DRAWER:
      return {
        ...state,
        selected: null,
        drawer: false,
      };

    default:
      return state;
  }
}
