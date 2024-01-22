import {
  CLOSE_DRAWER,
  CLOSE_MODAL,
  OPEN_DRAWER,
  OPEN_MODAL,
} from "../actiontypes";

export const openModal = (modalId, payload) => ({
  type: OPEN_MODAL,
  payload,
  meta: { modalId },
});

export const closeModal = (modalId) => ({
  type: CLOSE_MODAL,
  meta: { modalId },
});

export const openDrawer = (drawerId, payload) => ({
  type: OPEN_DRAWER,
  payload,
  meta: { drawerId },
});

export const closeDrawer = (drawerId) => ({
  type: CLOSE_DRAWER,
  meta: { drawerId },
});
