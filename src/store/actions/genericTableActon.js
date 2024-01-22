import axios from "axios";
import { actionFactory } from "../../libs/actionFactory";

import {
  CANDIDATE,
  CLIENTS,
  FETCH_ALL_ITEMS,
  INTERVIEWS,
  JOB_DESCRIPTIONS,
  JOB_OPENINGS,
  TEAMS,
} from "../actiontypes";

const getTableData = (url, params = {}) => actionFactory({
  api: `get/api/hiring/${url}/`,
  actionBody: { params: { ...params } },
  failureToast: true,
  callback: (respPromise, dispatch) => {
    respPromise
      .then((resp) => {
        dispatch({
          type: FETCH_ALL_ITEMS,
          payload: {
            id: url,
            data: resp.data,
          },
        });
      })
      .catch((_) => {});
  },
});

export const getAllInterviews = (params) => getTableData(INTERVIEWS, params);
export const getAllTeams = (params) => getTableData(TEAMS, params);
export const getAllClients = (params) => getTableData(CLIENTS, params);
export const getAllJobDescriptions = (params) => getTableData(JOB_DESCRIPTIONS, params);
export const getAllJobOpenings = (params) => getTableData(JOB_OPENINGS, params);

const createForm = (url, formData, successCallback) => {
  console.log(formData);
  return actionFactory({
    api: `post/api/hiring/${url}/`,

    actionBody: {
      body: formData,
    },
    failureToast: true,
    successToast: "Successfully added.",
    callback: (respPromise, dispatch, getState) => {
      respPromise
        .then((resp) => {
          console.log(resp);
          successCallback();
        })
        .catch((_err) => {});
    },
  });
};

export const createInterview = (formData, successCallback) => createForm(INTERVIEWS, formData, successCallback);
export const createTeam = (formData, successCallback) => createForm(TEAMS, formData, successCallback);
export const createClient = (formData, successCallback) => createForm(CLIENTS, formData, successCallback);
export const createJobDescription = (formData, successCallback) => createForm(JOB_DESCRIPTIONS, formData, successCallback);
export const createJobOpening = (formData, successCallback) => createForm(JOB_OPENINGS, formData, successCallback);
export const createCandidate = (formData, successCallback) => createForm(CANDIDATE, formData, successCallback);

const fetchData = async (url, setData) => {
  const jwtToken = localStorage.getItem("jwtToken");
  try {
    const response = await axios.get(`/api/hiring/${url}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${jwtToken}`,
      },
    });

    const formattedData = response.data.results.map((user) => ({
      name:
        url === CANDIDATE ? `${user.first_name} ${user.last_name}` : user.name,
      title: user.title || user.job_title,
      url: user.url,
    }));

    setData(formattedData);
  } catch (error) {
    console.error(`Error fetching data for ${url}:`, error);
  }
};
export const getCandidateData = (setData) => fetchData(CANDIDATE, setData);
export const getInterviewData = (setData) => fetchData(INTERVIEWS, setData);
export const getTeamData = (setData) => fetchData(TEAMS, setData);
export const getClientData = (setData) => fetchData(CLIENTS, setData);
export const getJobDescriptionData = (setData) => fetchData(JOB_DESCRIPTIONS, setData);
export const getJobOpeningData = (setData) => fetchData(JOB_OPENINGS, setData);
