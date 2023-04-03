import { createBrowserRouter } from "react-router-dom";

export default router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage cats={categories}/>,
      },
      {
        path: "",
        element: <HomePage />,
        loader: teamLoader,
      },
    ],
  },
]);