import { combineReducers } from "redux";
import applicationPage from "./applicationPage";
import genericTable from "./genericTable";
import modalDrawer from "./modalDrawer";
import tableprops from "./tableprops";
import interview from "./interview";
import auth from "./auth";

const rootReducer = combineReducers({
  auth,
  applicationPage,
  genericTable,
  modalDrawer,
  tableprops,
  interview,
});

export default rootReducer;
