import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root, { loader as rootLoader, action as rootAction, } from "./routes/root";
import ErrorPage from "./routes/error-page";
import Contact, {loader as contactLoader} from "./routes/contact";
import EditContact from "./routes/edit";
import {action as editAction} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";

//data res
import DataRes from "./components/routes/dataRes";
import DataEditComponent from "./components/routes/dataEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Root />,
    errorElement: <ErrorPage />,
    // call và load data từ contacts.js
    loader: rootLoader,
    action: rootAction,
    children:[
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
      {
        path:'data',
        element: <DataRes />
      },
      {
        path:'data/dataDetail/:dataId',
        element: <DataEditComponent />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);