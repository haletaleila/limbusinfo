import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainInfo from "./info/MainInfo";
import IdentityInfo from "./info/IdentityInfo";

const router = createBrowserRouter([
  {
    path: "/limbusinfo",
    element: <App />,
    children: [
      {
        path: "info",
        element: <MainInfo />,
      },
      {
        path: "identity",
        element: <IdentityInfo />,
      },
    ],
  },
]);

export default router;
