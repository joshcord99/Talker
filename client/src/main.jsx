import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Error from "../pages/Error.jsx";
import Home from "../pages/Home.jsx";
import CreateAccount from "../pages/CreateAccount.jsx";
import Personal from "../pages/Personal.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/createaccount",
        element: <CreateAccount />,
      },
      {
        path: "/personal",
        element: <Personal />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
