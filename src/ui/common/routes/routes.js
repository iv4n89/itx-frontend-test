import { createBrowserRouter } from "react-router";

/**
 * @type {import('react-router').RouteObject[]}
 */
const routes = [
  {
    path: "/",
    Component: <></>,
    children: [
      {
        index: true,
        element: <></>,
      },
    ],
  },
];

export const Routes = createBrowserRouter(routes);
