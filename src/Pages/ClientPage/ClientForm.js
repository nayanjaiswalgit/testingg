// ClientForm.jsx
import React, { useCallback, useEffect, useState } from "react";
import {
  ErrorMessage, Field, Form, Formik,
} from "formik";
import { useDispatch } from "react-redux";
import "./ClientForm.scss";
import InputModal from "../../components/Modal/Modal";
import { CLIENT_LIST_ID } from "../../constants";
import { closeModal } from "../../store/actions/modalDrawerActions";
import { AddClientForm } from "../../constants/validationSchemas";
import { getUser } from "../../store/actions/applicationPageAction";
import { createClient } from "../../store/actions/genericTableActon";

const ClientForm = () => {
  const dispatch = useDispatch();
  const [accountManagers, setAccountManagers] = useState([]);
  const [clientBody, setclientBody] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const INITIAL_FORM_VALUES = {
    name: "",
    account_manager: "",
    state: "",
    remark: "",
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
    dispatch(closeModal(CLIENT_LIST_ID));
    setIsLoading(false);
  };

  useEffect(() => {
    getUser(setAccountManagers);
  }, []);

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      dispatch(createClient(values, callbackSuccessUpdate));
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
      id={CLIENT_LIST_ID}
      title={"Add Client"}
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
        validationSchema={AddClientForm}
        enableReinitialize
      >
        {({ handleChange }) => (
          <Form className="client-form">
            <div className="row">
              <div>
                <label htmlFor="name">Client Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Client Name"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>

              <div>
                <label htmlFor="name">Account Manager</label>

                <Field
                  as="select"
                  id="account_manager"
                  name="account_manager"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                >
                  <option
                    className="defult-option"
                    value=""
                    disabled
                    selected
                    hidden
                  >
                    Account Manager
                  </option>
                  {accountManagers.map((manager) => (
                    <option key={manager.url} value={manager.url}>
                      {manager.name}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
            <div className="row">
              <div>
                <label htmlFor="remark">State</label>
                <Field
                  label="State"
                  as="select"
                  id="state"
                  name="state"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                >
                  <option
                    className="defult-option"
                    value=""
                    disabled
                    selected
                    hidden
                  >
                    State
                  </option>
                  <option value="active">In Operation</option>
                  <option value="closed">No longer active</option>
                </Field>
                <ErrorMessage
                  name="state"
                  component="div"
                  className="error-message"
                />
              </div>
              <div>
                <label htmlFor="remark">Final Remark</label>
                <Field as="textarea" id="remark" name="remark" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </InputModal>
  );
};

export default ClientForm;
