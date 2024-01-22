import React, { useCallback, useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import "./AddJobDescription.scss";
import { getUser } from "../../store/actions/applicationPageAction";
import { AddJobDescriptionSchema } from "../../constants/validationSchemas";
import { JD_LIST_ID } from "../../constants";
import { closeModal } from "../../store/actions/modalDrawerActions";
import InputModal from "../../components/Modal/Modal";
import { createJobDescription } from "../../store/actions/genericTableActon";

const AddJobDescription = () => {
  const dispatch = useDispatch();
  const [accountManagers, setAccountManagers] = useState([]);
  const [clientBody, setclientBody] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const INITIAL_FORM_VALUES = {
    title: "",
    description: "",
    default_watchers: "",
    state: "",
    testlink: "",
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
    getUser(setAccountManagers);
  }, []);

  const callbackSuccessUpdate = () => {
    dispatch(closeModal(JD_LIST_ID));
    setIsLoading(false);
  };

  const handleSubmit = (values) => {
    setIsLoading(true);

    const sumbitData = {
      ...values,
      default_watchers: [values.default_watchers],
    };

    try {
      dispatch(createJobDescription(sumbitData, callbackSuccessUpdate));
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
      id={JD_LIST_ID}
      title={"Add Job Descriptions"}
      onOk={() => handleSubmit(clientBody)}
      confirmLoading={isLoading}
      okButtonProps={{ disabled: isFormValid }}
    >
      <Formik
        validateOnChange
        validateOnBlur
        validateOnMount
        innerRef={onFormikRefSet}
        initialValues={INITIAL_FORM_VALUES}
        validationSchema={AddJobDescriptionSchema}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form className="team-form">
            <div className="row">
              <div>
                <label htmlFor="title">Job Title</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Job Title"
                />
                {errors.title && touched.title && (
                  <div className="error-message">{errors.title}</div>
                )}
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
                {errors.state && touched.state && (
                  <div className="error-message">{errors.state}</div>
                )}
              </div>
            </div>
            <div className="row">
              <div>
                <label htmlFor="testlink">Test Link</label>
                <Field
                  type="text"
                  id="testlink"
                  name="testlink"
                  placeholder="Test Link"
                />
                {errors.testlink && touched.testlink && (
                  <div className="error-message">{errors.testlink}</div>
                )}
              </div>
              <div>
                <label htmlFor="default_watchers">Watchers</label>
                <Field
                  as="select"
                  id="default_watchers"
                  name="default_watchers"
                >
                  <option className="defult-option" value="" disabled hidden>
                    Select Watchers
                  </option>

                  {accountManagers.map((user) => (
                    <option key={user.url} value={user.url}>
                      {user.name}
                    </option>
                  ))}
                </Field>
                {errors.default_watchers && touched.default_watchers && (
                  <div className="error-message">{errors.default_watchers}</div>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field as="textarea" id="description" name="description" />
              {errors.description && touched.description && (
                <div className="error-message">{errors.description}</div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </InputModal>
  );
};

export default AddJobDescription;
