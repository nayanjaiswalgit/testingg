import axios from "axios";
import { isEqual, isFunction } from "lodash";

// TODO: add Toast element
// import toast from "react-hot-toast";
import constants from "../constants";
import { callToast } from "../components/Toast/toastHelper";
import { LOGOUT } from "../store/actiontypes";

const pathExtractor = (request_path, params) => {
  const request_type = request_path.slice(0, request_path.indexOf("/"));
  const psuedo_path = request_path.slice(request_path.indexOf("/") + 1);

  let path = psuedo_path;
  for (const key in params) {
    path = psuedo_path.replaceAll(key, params[key]);
  }

  return { request_type, path };
};

/**
 *
 * @param {object} Object containing the following properties.
 *   @param {string}            api              api path 'get/api/categories'.
 *   @param {string}            actionBase       action type base 'GET_USERS'.
 *   @param {object}            actionBody       actionBody to be passed to the api path.
 *   @param {function}          callback         callback function to be called after the api call is completed.
 *   @param {string}            successToast     Toast message to be displayed on success.
 *   @param {bool || string}    failureToast     Toast message to be displayed on failure.
 * @return  {function}          action creator function to make API call and dispatching the response.
 */

export const actionFactory = ({
  api,
  actionBase,
  actionBody = {},
  callback = () => {},
  successToast = null,
  failureToast = null,
  initialization = () => {},
}) => {
  const REQUEST = `${actionBase}_REQUEST`;
  const SUCCESS = `${actionBase}_SUCCESS`;
  const FAILURE = `${actionBase}_FAILURE`;
  const PARAM_DEBUG = `${actionBase}_REQ_PARAM_DEBUG`;

  return function (dispatch, getState) {
    let p;
    if (isFunction(actionBody)) {
      p = actionBody(getState);
    } else {
      p = { ...actionBody };
    }
    initialization(p, dispatch, getState);
    dispatch({
      type: REQUEST,
      payload: p,
    });
    dispatch({
      type: PARAM_DEBUG,
      payload: {
        obj: p,
        json: JSON.stringify(p),
      },
    });
    const token = localStorage.getItem("token");
    const jwtToken = localStorage.getItem("jwtToken");
    const { request_type, path } = pathExtractor(api, p);
    const respPromise = axios({
      method: request_type,
      url: path,
      data: p.body,
      headers: {
        "Content-Type": "application/json",
        Authorization: jwtToken ? `Token ${jwtToken}` : `${token}`,
      },
      params: p.params,
    });

    respPromise
      .then((resp) => {
        dispatch({
          type: SUCCESS,
          payload: resp.data,
        });

        if (successToast) {
          // TODO: successToast is needed
          callToast(
            {
              tittle: "Success",
              description: successToast,
            },
            constants.SUCCESS_TOAST,
          );
        }

        return resp.data;
      })
      .catch((err) => {
        dispatch({
          type: FAILURE,
          payload: err.message,
        });

        if (typeof failureToast === "boolean" && failureToast) {
          // TODO: show some failureToast
          // toast.error(err?.response?.data?.status?.status_message);

          callToast(
            {
              tittle: "Error",
              description: `${err.message} ${
                err.response
                  ? `- Status: ${err.response.status} - Data: ${JSON.stringify(err.response.data)}`
                  : ""
              }`,
            },
            constants.ERROR_TOAST,
          );

          if (
            isEqual(
              err?.response?.data?.status?.status_message,
              "Token Expired",
            )
          ) {
            localStorage.removeItem("token");
            localStorage.removeItem("picture");
            dispatch({ type: LOGOUT });
          }
        }

        if (typeof failureToast === "string") {
          // toast.error(failureToast);
          callToast(
            {
              tittle: "Error",
              description: failureToast,
            },
            constants.ERROR_TOAST,
          );
        }

        throw err.message;
      });

    callback(respPromise, dispatch, getState);
  };
};
