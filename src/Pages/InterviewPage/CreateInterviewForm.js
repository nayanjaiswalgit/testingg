import { useCallback, useEffect, useState } from "react";
import {
  ErrorMessage, Field, Form, Formik,
} from "formik";
import { useDispatch } from "react-redux";
import "./CreateInterviewForm.scss";
import { INTERVIEW_LIST_ID } from "../../constants";
import InputModal from "../../components/Modal/Modal";
import { closeModal } from "../../store/actions/modalDrawerActions";
import {
  createInterview,
  getCandidateData,
  getJobOpeningData,
} from "../../store/actions/genericTableActon";
import { getUser } from "../../store/actions/applicationPageAction";

const CreateInterviewForm = () => {
  const [candidate, setCandidate] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [job_id, setjob_id] = useState([]);
  const [clientBody, setclientBody] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();
  const INITIAL_FORM_VALUES = {
    date: "",
    state: "schd",
    remark: "",
    location: "",
    candidate: "",
    prev_interview: "",
    job_id: "",
    interviewers: [],
  };
  useEffect(() => {
    getUser(setInterviewers);
    getCandidateData(setCandidate);
    getJobOpeningData(setjob_id);
  }, []);

  const onFormikRefSet = useCallback((ref) => {
    setTimeout(() => {
      if (ref) {
        setIsFormValid(!ref.isValid);
        setclientBody(ref.values);
      }
    }, 0);
  });

  const callbackSuccessUpdate = () => {
    dispatch(closeModal(INTERVIEW_LIST_ID));
    setIsLoading(false);
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);

    const sumbitData = { ...values, interviewers: [values.interviewers] };

    try {
      dispatch(createInterview(sumbitData, callbackSuccessUpdate));
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
      id={INTERVIEW_LIST_ID}
      title={"Schedule Interview"}
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
        // validationSchema={AddCandidatevalidationSchema}
        enableReinitialize
      >
        <Form className="interview-form">
          <div className="row">
            <div>
              <label>Candidate</label>
              <Field as="select" name="candidate">
                <option
                  className="defult-option"
                  value=""
                  disabled
                  selected
                  hidden
                >
                  Select Candidate
                </option>
                {candidate.map((manager) => (
                  <option key={manager.url} value={manager.url}>
                    {manager.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="candidate"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label>Date</label>
              <Field type="datetime-local" name="date" />
              <ErrorMessage name="date" component="div" className="error" />
            </div>
          </div>
          <div className="row">
            <div>
              <label>Job</label>

              <Field as="select" name="job_id">
                <option
                  className="defult-option"
                  value=""
                  disabled
                  selected
                  hidden
                >
                  {" "}
                  Select Job
                </option>
                {job_id.map((job) => (
                  <option key={job.url} value={job.url}>
                    {job.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="job_id" component="div" className="error" />
            </div>
            <div>
              <label>Interviewers</label>
              <Field as="select" name="interviewers">
                <option
                  className="defult-option"
                  value=""
                  disabled
                  selected
                  hidden
                >
                  {" "}
                  Interviewers
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
                className="error"
              />
            </div>
          </div>
          {/* <div className="row">
                        <div>
                            <label>location</label>
                            <Field type="text" name="location" />
                            <ErrorMessage name="location" component="div" className="error" />
                        </div>
                        <div>
                            <label>Previous interviews</label>
                            <Field type="text" name="prev_interview" />
                            <ErrorMessage
                                name="prev_interview"
                                component="div"
                                className="error"
                            />
                        </div>
                    </div> */}
          {/* <div>
                            <label>State</label>

                            <Field as="select" name="state" >
                                <option className="defult-option" value=""
                                disabled selected hidden>Select State</option>
                                <option value="schd">Schedule Interview</option>
                                <option value="done">Done</option>
                                <option value="cancel">Cancelled</option>
                            </Field>

                            <ErrorMessage name="state" component="div" className="error" />
                        </div> */}

          <div>
            <label>Remark</label>
            <Field as="textarea" name="remark" />
            <ErrorMessage name="remark" component="div" className="error" />
          </div>
        </Form>
      </Formik>
    </InputModal>
  );
};

export default CreateInterviewForm;
