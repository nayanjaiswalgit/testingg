import { actionFactory } from "../../libs/actionFactory";
import { ALL_CANDIDATES, LOGIN_FAIL } from "../actiontypes";
// Assuming CLEAR_SELECTED_USER and SELECTED_USER are imported from actiontypes

const getAllCandidates = (params = {}, callback) => actionFactory({
  api: "get/api/hiring/candidates/",
  actionBody: {
    params: { ...params },
  },
  callback: (respPromise, dispatch, getState) => {
    respPromise
      .then((resp) => {
        if (resp.status === 200) {
          dispatch({
            type: ALL_CANDIDATES,
            payload: resp.data.results,
          });
        }
        if (callback) {
          callback();
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  },
});
export default getAllCandidates;
