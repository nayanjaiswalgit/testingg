import {
  CLOSE_DRAWER,
  CLOSE_MODAL,
  OPEN_DRAWER,
  OPEN_MODAL,
} from "../actiontypes/index";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload, meta } = action;

  switch (type) {
    case OPEN_MODAL:
      return {
        ...state,
        [meta.modalId]: { isModalOpen: true, modalPayload: payload },
      };

    case CLOSE_MODAL:
      return {
        ...state,
        [meta.modalId]: { isModalOpen: false, modalPayload: null },
      };

    case OPEN_DRAWER:
      return {
        ...state,
        [meta.drawerId]: { isDrawerOpen: true, drawerPayload: payload },
      };

    case CLOSE_DRAWER:
      return {
        ...state,
        [meta.drawerId]: { isDrawerOpen: false, drawerPayload: null },
      };

    default:
      return state;
  }
}
