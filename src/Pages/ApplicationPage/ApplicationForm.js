import React, { useCallback, useEffect, useState } from "react";
import {
  ErrorMessage, Field, Form, Formik,
} from "formik";
import { useDispatch } from "react-redux";
import "./ApplicationForm.scss";
import { CANDIDATE_LIST_ID } from "../../constants";
import InputModal from "../../components/Modal/Modal";
import { AddCandidatevalidationSchema } from "../../constants/validationSchemas";
import { closeModal } from "../../store/actions/modalDrawerActions";
import {
  createCandidate,
  getJobDescriptionData,
} from "../../store/actions/genericTableActon";

const ApplicationForm = () => {
  const [watchers, setWatchers] = useState([]);
  const [descriptions, setDescription] = useState([]);
  const [clientBody, setclientBody] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const dispatch = useDispatch();
  const INITIAL_FORM_VALUES = {
    first_name: "",
    email: "",
    contact_number: "",
    experience: "",
    current_location: "",
    notice_period: "",
    job_title: "",
    current_ctc: "",
    expected_ctc: "",
    resume: null,
    remark: "",
    source: "",
    recruiter: "",
    campus: "",
    job_id: "",
    watchers: [],
  };

  const onFormikRefSet = useCallback((ref) => {
    setTimeout(() => {
      if (ref) {
        setIsFormValid(!ref.isValid);
        setclientBody(ref.values);
      }
    }, 0);
  });

  const callbackSuccessUpdate = () => {
    dispatch(closeModal(CANDIDATE_LIST_ID));
    setIsLoading(false);
  };
  useEffect(() => {
    getJobDescriptionData(setDescription);
  }, []);
  const handleSubmit = async (values) => {
    console.log(values);
    setIsLoading(true);
    const sumbitData = { ...values, job_id: [values.job_id] };
    try {
      dispatch(createCandidate(sumbitData, callbackSuccessUpdate));
    } catch (error) {
      console.log(
        "There was an error while submitting the form. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InputModal
      id={CANDIDATE_LIST_ID}
      title={"Add Candidate"}
      onOk={() => handleSubmit(clientBody)}
      confirmLoading={isLoading}
      okButtonProps={{ disabled: isFormValid }}
    >
      <Formik
        fluid
        validateOnChange
        validateOnBlur={true}
        validateOnMount
        innerRef={onFormikRefSet}
        initialValues={INITIAL_FORM_VALUES}
        validationSchema={AddCandidatevalidationSchema}
        enableReinitialize
      >
        <Form className="candidate-form">
          <div className="row">
            <div>
              <label htmlFor="first_name">Name</label>
              <Field
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Full Name"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" placeholder="Email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="contact_number">Contact Number</label>
              <Field
                type="text"
                id="contact_number"
                name="contact_number"
                placeholder="Contact Number"
              />
              <ErrorMessage
                name="contact_number"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <label htmlFor="current_location">Current Location</label>
              <Field
                type="text"
                id="current_location"
                name="current_location"
                placeholder="Current Location"
              />
              <ErrorMessage
                name="current_location"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="experience">Experience (in years)</label>
              <Field
                type="text"
                id="experience"
                name="experience"
                placeholder="Experience"
              />
              <ErrorMessage
                name="experience"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <label className="file_input_label" htmlFor="resume">
                Upload Resume
              </label>
              <Field
                className="file_input"
                type="file"
                id="resume"
                name="resume"
              />
              <ErrorMessage
                name="resume"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="notice_period">Notice Period (in days)</label>
              <Field
                type="text"
                id="notice_period"
                name="notice_period"
                placeholder="Notice Period"
              />
              <ErrorMessage
                name="notice_period"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <label htmlFor="job_id">Job Title</label>
              <Field
                as="select"
                id="job_id"
                name="job_id"
                placeholder="Job Title"
              >
                <option
                  className="defult-option"
                  value=""
                  disabled
                  selected
                  hidden
                >
                  Select JD
                </option>
                {descriptions.map((description) => (
                  <option key={description.url} value={description.url}>
                    {description.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="job_title"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="current_ctc">Current CTC</label>
              <Field
                type="text"
                id="current_ctc"
                name="current_ctc"
                placeholder="Current CTC"
              />
              <ErrorMessage
                name="current_ctc"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <label htmlFor="expected_ctc">Expected CTC</label>
              <Field
                type="text"
                id="expected_ctc"
                name="expected_ctc"
                placeholder="Expected CTC"
              />
              <ErrorMessage
                name="expected_ctc"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          {/* <div className="row">

                        <div>
                            <label htmlFor="watchers">Watchers</label>
                            <Field as="select" id="watchers" name="watchers" multiple>
                                {watchers.map(watcher => (
                                    <option key={watcher.url} value={watcher.url}>{watcher.name}</option>
                                ))}
                            </Field>
                        </div>
                    </div> */}
        </Form>
      </Formik>
    </InputModal>
  );
};

export default ApplicationForm;
