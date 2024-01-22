import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { Toaster } from "react-hot-toast";
import appRoutes from "./libs/routes";
import constants from "./constants";

function App() {
  return (
    <div className="App">
      <RouterProvider router={appRoutes(constants.USER_GROUP)} />
      <Toaster
        toastOptions={{
          duration: 3000,
          position: "top-right",
          className: "",
          style: {
            maxWidth: 500,
            wordBreak: "break-all",
            padding: "0px",
          },
        }}
      />
    </div>
  );
}

export default App;
