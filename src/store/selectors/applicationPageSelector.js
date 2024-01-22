const candidateSelector = (state) => state.applicationPage;

export const allCandSelector = (state) => candidateSelector(state).Candidatelist;

export const selectedListCandSelector = (state) => candidateSelector(state).selectedlist;

export const candIsLoadingSelector = (state) => candidateSelector(state).loading;
