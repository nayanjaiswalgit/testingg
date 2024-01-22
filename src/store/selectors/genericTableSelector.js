export const getGenericTableState = (state, id) => state.genericTable[id];
export const getItemList = (state, id) => getGenericTableState(state, id)?.itemList;
export const getSelectedItems = (state, id) => getGenericTableState(state, id)?.selectedItems;
export const getLoadingStatus = (state, id) => getGenericTableState(state, id)?.loading;
export const getSelected = (state, id) => getGenericTableState(state, id)?.selected;
export const isDrawerOpen = (state, id) => getGenericTableState(state, id)?.isDrawerOpen;
