import * as Yup from "yup";

export const AddClientForm = Yup.object().shape({
  name: Yup.string().required("Client Name is Required"),
  state: Yup.string().required("State is Required"),
});

export const AddTeamFormSchema = Yup.object().shape({
  name: Yup.string().required("Team Name is required"),
  client: Yup.string().required("Client is required"),
  state: Yup.string().required("State is required"),
  manager: Yup.string().required("Team Manager is required"),
  remark: Yup.string(),
});

export const AddJobDescriptionSchema = Yup.object().shape({
  title: Yup.string().required("Job Title is required"),
  description: Yup.string().required("Description is required"),
  // default_watchers: Yup.string().required('Watchers are required'),
  state: Yup.string().required("State is required"),
  testlink: Yup.string(),
});

export const AddJobOpeningFormSchema = Yup.object().shape({
  job_title: Yup.string().required("Job Title is required"),
  state: Yup.string().required("State is required"),
  details: Yup.string().required("Details is required"),
  jd: Yup.string().required("Select a Job Description"),
  hiring_team: Yup.string().required("Select a Team"),
  testlink: Yup.string(),
  interviewers: Yup.string().required("Watchers are required"),
});

export const AddCandidatevalidationSchema = Yup.object().shape({
  first_name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contact_number: Yup.string().required("Contact number is required"),
  experience: Yup.number().integer().required("Experience number is required"),
  current_location: Yup.string(),
  notice_period: Yup.number().integer(),
  // job_title: Yup.string().required("Job title is required"),
  current_ctc: Yup.number().positive().integer(),
  expected_ctc: Yup.number().positive().integer(),
  resume: Yup.mixed().required("Resume is required"),
  source: Yup.string(),
  joining_date: Yup.date(),
  recruiter: Yup.string(),
  campus: Yup.string(),

  // watchers: Yup.array().min(1, "At least one watcher is required"),
});
