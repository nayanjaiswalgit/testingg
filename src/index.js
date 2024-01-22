import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { ConfigProvider } from "antd";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./theme";

import store from "./store/store";
import constants from "./constants";

const root = ReactDOM.createRoot(document.getElementById("root"));

const CthrApp = () => (
  <GoogleOAuthProvider clientId={constants.CLIENT_ID}>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </GoogleOAuthProvider>
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CthrApp />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
