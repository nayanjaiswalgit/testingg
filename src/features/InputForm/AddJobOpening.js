import React, { useCallback, useEffect, useState } from "react";
import {
  ErrorMessage, Field, Form, Formik,
} from "formik";
import { useDispatch } from "react-redux";
import "./AddJobOpening.scss";
import InputModal from "../../components/Modal/Modal";
import { JO_LIST_ID } from "../../constants";
import { getUser } from "../../store/actions/applicationPageAction";
import {
  createJobOpening,
  getJobDescriptionData,
  getTeamData,
} from "../../store/actions/genericTableActon";
import { AddJobOpeningFormSchema } from "../../constants/validationSchemas";
import { closeModal } from "../../store/actions/modalDrawerActions";

const AddJobOpening = () => {
  const dispatch = useDispatch();
  const [interviewers, setInterviewers] = useState([]);
  const [teams, setTeam] = useState([]);
  const [descriptions, setDescription] = useState([]);

  const [clientBody, setclientBody] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const INITIAL_FORM_VALUES = {
    job_title: "",
    interviewers: "",
    state: "",
    jd: "",
    hiring_team: "",
    testlink: "",
    remark: "",
    details: "",
  };

  const onFormikRefSet = useCallback((ref) => {
    setTimeout(() => {
      if (ref) {
        setIsFormValid(!ref.isValid);
        setclientBody(ref.values);
      }
    }, 0);
  });

  useEffect(() => {
    getUser(setInterviewers);
    getJobDescriptionData(setDescription);
    getTeamData(setTeam);
  }, []);

  const callbackSuccessUpdate = () => {
    dispatch(closeModal(JO_LIST_ID));
    setIsLoading(false);
  };

  const handleSubmit = (values) => {
    setIsLoading(true);

    const sumbitData = { ...values, interviewers: [values.interviewers] };
    console.log(sumbitData);
    try {
      dispatch(createJobOpening(sumbitData, callbackSuccessUpdate));
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
      id={JO_LIST_ID}
      title={"Add Job Openings"}
      onOk={() => handleSubmit(clientBody)}
      confirmLoading={isLoading}
      okButtonProps={{ disabled: isFormValid }}
    >
      <Formik
        fluid
        validateOnChange
        validateOnBlur
        validateOnMount
        innerRef={onFormikRefSet}
        initialValues={INITIAL_FORM_VALUES}
        validationSchema={AddJobOpeningFormSchema}
        enableReinitialize
      >
        <Form className="team-form">
          <div className="row">
            <div>
              <label htmlFor="name">Job Title</label>
              <Field
                type="text"
                id="job_title"
                name="job_title"
                placeholder="Job Title"
              />
              <ErrorMessage
                name="job_title"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <Field as="select" id="state" name="state">
                <option
                  className="defult-option"
                  value=""
                  disabled
                  selected
                  hidden
                >
                  Select State
                </option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="offered">Offer Given</option>
                <option value="onhold">On Hold</option>
              </Field>
              <ErrorMessage
                name="state"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="jd">Select JD</label>
              <Field as="select" id="jd" name="jd">
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
                name="jd"
                component="div"
                className="error-message"
              />
            </div>

            <div>
              <label htmlFor="hiring_team">Select Team</label>
              <Field as="select" id="hiring_team" name="hiring_team">
                <option
                  className="defult-option"
                  value=""
                  disabled
                  selected
                  hidden
                >
                  Select Team
                </option>
                {teams.map((team) => (
                  <option key={team.url} value={team.url}>
                    {team.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="hiring_team"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="name">Test Link</label>
              <Field
                type="text"
                id="testlink"
                name="testlink"
                placeholder="Test Link"
              />
              <ErrorMessage
                name="testlink"
                component="div"
                className="error-message"
              />
            </div>

            <div>
              <label htmlFor="manager">Interviewers</label>
              <Field as="select" id="interviewers" name="interviewers">
                <option
                  className="defult-option"
                  value=""
                  disabled
                  selected
                  hidden
                >
                  Select interviewers
                </option>
                {interviewers.map((user) => (
                  <option key={user.url} value={user.url}>
                    {user.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="interviewers"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="remark">Remark</label>
              <Field as="textarea" id="remark" name="remark" />
              <ErrorMessage
                name="remark"
                component="div"
                className="error-message"
              />
            </div>

            <div>
              <label htmlFor="details">Details</label>
              <Field as="textarea" id="details" name="details" />
              <ErrorMessage
                name="details"
                component="div"
                className="error-message"
              />
            </div>
          </div>
        </Form>
      </Formik>
    </InputModal>
  );
};

export default AddJobOpening;
