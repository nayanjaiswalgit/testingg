import {
  CLIENTS,
  FETCH_ALL_ITEMS,
  INTERVIEWS,
  JOB_DESCRIPTIONS,
  JOB_OPENINGS,
  SELECT_ITEMS,
  TEAMS,
} from "../actiontypes";

const generateInitialState = () => ({
  itemList: [],
  loading: true,
  selectedItems: [],
});

const initialState = {
  [INTERVIEWS]: generateInitialState(),
  [TEAMS]: generateInitialState(),
  [CLIENTS]: generateInitialState(),
  [JOB_DESCRIPTIONS]: generateInitialState(),
  [JOB_OPENINGS]: generateInitialState(),
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_ITEMS: {
      const { id, data } = payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          itemList: data,
          loading: false,
        },
      };
    }
    case SELECT_ITEMS: {
      const { id, data } = payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          selectedItems: data,
        },
      };
    }

    // case SELECT_SINGLE_ITEM: {
    //     const { id, data } = payload;

    //     return {
    //         ...state,
    //         [id]: {
    //             ...state[id],
    //             selected: data,
    //             isDrawerOpen: true,
    //         }

    //     };
    // }
    // case CLOSE_DRAWER: {
    //     const { id, data } = payload

    //     return {
    //         ...state,
    //         [id]: {
    //             ...state[id],
    //             drawer: data,
    //         }

    //     };

    // }

    default:
      return state;
  }
}
