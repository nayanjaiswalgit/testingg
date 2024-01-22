/* eslint-disable no-unused-vars */
import { actionFactory } from "../../libs/actionFactory";
import { encodeData } from "../../libs/jwt";
import {
  GOOGLE_CLIENT_ID,
  ISCANCELLED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actiontypes/index";

const clearLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("picture");
};

export const logoutUser = (dispatch) => {
  clearLocalStorage();
  // dispatch({ type: CLEAR_COURSES });
  return dispatch({ type: LOGOUT });
};
export const isCancelled = (payload) => ({
  type: ISCANCELLED,
  payload,
});

export const loadUserDetails = (useremail) => actionFactory({
  api: "get/api/hiring/register-user/current_user/",
  actionBody: {
    body: useremail,
  },
  failureToast: true,
  callback: (respPromise, dispatch, getState) => {
    respPromise
      .then((resp) => {
        console.log("userDetails", resp);
        if (resp.status.status_type === "SUCCESS") {
          // const picture = localStorage.getItem("picture");
          // dispatch({
          //   type: LOGIN_SUCCESS,
          //   payload: { ...resp.data.data, picture },
          // });
        }
      })
      .catch((err) => {
        // if (err["response"].data.status.status_message === "Token Expired") {
        //   clearLocalStorage();
        //   window.location.replace("/#/login");
        // } else {
        //   clearLocalStorage();
        //   window.location.reload("/#/login");
        // }
        window.location.replace("/#/login");
        clearLocalStorage();
      });
  },
});

export const registerUser = (user, picture) => actionFactory({
  api: "post/api/hiring/register-user/register/",
  actionBody: {
    body: user,
  },
  failureToast: true,
  callback: (respPromise, dispatch, getState) => {
    respPromise
      .then((resp) => {
        console.log("registeruser", resp);
        if (resp.status === 200) {
          // console.log("in");
          // dispatch({
          //   type: LOGIN_SUCCESS,
          //   payload: { ...resp.data.data.userDetails, picture },
          // });
          // commented beacuse it was calling API ?user=undefined
          // while calling enroll api on userDAshboard page
          dispatch(loadUserDetails(resp.data.email));
        } else {
          dispatch({ type: LOGIN_FAIL });
          dispatch(logoutUser());
        }
      })
      .catch((err) => {
        clearLocalStorage();
      });
  },
});

// export const validateTokenAction = () => {
//   return actionFactory({
//     // change this with backend api link
//     // api: "post/api/register-by-access-token/social/google-oauth2/",
//     api: "post/api/auth/validate-token",
//     failureToast: true,
//     callback: (respPromise, dispatch, getState) => {
//       respPromise
//         .then((resp) => {
//           console.log(resp)
//           if (resp.status === 200) {
//             localStorage.setItem("jwtToken", resp.data.token)
//             localStorage.setItem("userEmail", resp.data.email)
//             // localStorage.setItem("picture", resp.data.data.picture);
//             return resp
//           } else {
//             console.log("in else")
//             dispatch(logoutUser());
//           }
//         })
//         .catch((e) => {
//           console.log(e)
//           clearLocalStorage()}
//           );
//     },
//   });
// };

export const validateTokenAction = () => actionFactory({
  api: "post/api/auth/validate-token",
  failureToast: true,
  callback: (respPromise, dispatch, getState) => {
    respPromise
      .then((resp) => {
        // console.log("validateToken", resp.data);
        if (resp.data.status.status_type === "SUCCESS") {
          encodeData(resp.data.data.user);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: resp?.data?.data?.user,
          });

          dispatch(
            registerUser(
              {
                // emp_id: "CTE-1092",
                user_info: resp.data.data.user,
                email: resp.data.data.user.email,
                tokens: resp.data.data.received_tokens,
              },
              resp.data.data.picture,
            ),
          );
        } else {
          dispatch(logoutUser());
        }
      })
      .catch((err) => {
        console.log(err);
        clearLocalStorage();
      });
  },
});

// currently not implemented in backend
export const getClientId = () => actionFactory({
  api: "get/api/client-id",
  failureToast: true,
  actionBase: GOOGLE_CLIENT_ID,
  callback: (respPromise, dispatch) => {
    respPromise
      .then((resp) => {
        dispatch({
          type: GOOGLE_CLIENT_ID,
          payload: resp.data.data?.client_id,
        });
      })
      .catch((_) => {});
  },
});
