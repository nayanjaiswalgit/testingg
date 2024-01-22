export const tableSelector = (state) => state.tableprops;

export const buttonStateSelector = (state, buttonKey) => tableSelector(state)[buttonKey];

export const tableProps = (state, id) => state.tableprops[id] || {};

export const getTableLimit = (state, id) => state?.tableprops[id]?.limit || 10;

export const getTableOffset = (state, id) => state?.tableprops[id]?.offset || 0;

export const searchText = (state) => tableSelector(state).searchText;
