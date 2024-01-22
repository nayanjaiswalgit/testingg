const getMDState = (state, id) => state.modalDrawer[id] || {};
export const isModalOpenSelector = (state, id) => getMDState(state, id).isModalOpen || false;
export const isDrawerOpenSelector = (state, id) => getMDState(state, id).isDrawerOpen || false;
export const modalPayloadSelector = (state, id) => getMDState(state, id).modalPayload || null;
export const drawerPayloadSelector = (state, id) => getMDState(state, id).drawerPayload || null;
