import App, { AppErrorElement } from "./App";
import Layout from "./components/layout";
import Home from "./Home";
import NotFound from "./NotFound";

export default [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "app", element: <App />, errorElement: <AppErrorElement /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
