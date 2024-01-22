import axios from "axios";
import { actionFactory } from "../../libs/actionFactory";
import { ALL_CANDIDATES } from "../actiontypes/index";

const getTableData = (url, params = {}) => actionFactory({
  api: `get/api/hiring/${url}/`,
  actionBody: { params: { ...params } },
  failureToast: true,

  callback: (respPromise, dispatch) => {
    respPromise
      .then((resp) => {
        dispatch({
          type: ALL_CANDIDATES,
          payload: resp.data,
        });
      })
      .catch((_) => {});
  },
});

export const getAllCandidates = (params) => getTableData("candidates", params);

export const getUser = async (setData) => {
  const jwtToken = localStorage.getItem("jwtToken");
  try {
    const response = await axios.get("/api/hiring/users/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${jwtToken}`,
      },
    });
    const usersData = response.data.results.map((user) => ({
      name: `${user.first_name} ${user.last_name}`,
      url: user.url,
    }));
    setData(usersData);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
