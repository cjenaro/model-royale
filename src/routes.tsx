import App from "./App";
import Layout from "./components/layout";
import Home from "./Home";
import NotFound from "./NotFound";

export default [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "app", element: <App /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
