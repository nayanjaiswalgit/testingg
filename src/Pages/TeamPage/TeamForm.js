import React, { useCallback, useEffect, useState } from "react";
import {
  ErrorMessage, Field, Form, Formik,
} from "formik";
import { useDispatch } from "react-redux";

import "./TeamForm.scss";
import { TEAM_LIST_ID } from "../../constants";
import InputModal from "../../components/Modal/Modal";
import { AddTeamFormSchema } from "../../constants/validationSchemas";
import { getUser } from "../../store/actions/applicationPageAction";
import { closeModal } from "../../store/actions/modalDrawerActions";
import {
  createTeam,
  getClientData,
} from "../../store/actions/genericTableActon";

const TeamForm = () => {
  const dispatch = useDispatch();
  const [accountManagers, setAccountManagers] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientBody, setclientBody] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const INITIAL_FORM_VALUES = {
    name: "",
    manager: "",
    state: "",
    remark: "",
    client: "",
  };

  const onFormikRefSet = useCallback((ref) => {
    setTimeout(() => {
      if (ref) {
        setIsFormValid(!ref.isValid);
        setclientBody(ref.values);
        console.log(ref.values);
      }
    }, 0);
  });

  const callbackSuccessUpdate = () => {
    dispatch(closeModal(TEAM_LIST_ID));
    setIsLoading(false);
  };

  useEffect(() => {
    getUser(setAccountManagers);
    getClientData(setClients);
  }, []);

  const handleSubmit = (values) => {
    setIsLoading(true);
    try {
      dispatch(createTeam(values, callbackSuccessUpdate));
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
      id={TEAM_LIST_ID}
      title={"Add Team"}
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
        validationSchema={AddTeamFormSchema}
      >
        {({ handleChange, errors, touched }) => (
          <Form className="team-form">
            <div className="row">
              <div>
                <label htmlFor="name">Team Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Team Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>
              <div>
                <label htmlFor="client">Client</label>
                <Field as="select" id="client" name="client">
                  <option
                    className="defult-option"
                    value=""
                    disabled
                    selected
                    hidden
                  >
                    Select Client
                  </option>
                  {clients.map((client) => (
                    <option key={client.url} value={client.url}>
                      {client.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="client"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
            <div className="row">
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
                <label htmlFor="manager">Team Manager</label>
                <Field as="select" id="manager" name="manager">
                  <option
                    className="defult-option"
                    value=""
                    disabled
                    selected
                    hidden
                  >
                    Select Team Manager
                  </option>
                  {accountManagers.map((user) => (
                    <option key={user.url} value={user.url}>
                      {user.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="manager"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
            <div>
              <label htmlFor="remark">Remark</label>
              <Field as="textarea" id="remark" name="remark" />
              <ErrorMessage
                name="remark"
                component="div"
                className="error-message"
              />
            </div>
          </Form>
        )}
      </Formik>
    </InputModal>
  );
};

export default TeamForm;
