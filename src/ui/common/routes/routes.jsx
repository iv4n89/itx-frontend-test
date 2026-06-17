import { createBrowserRouter } from "react-router";
import { Layout } from "../components/layout/layout";
import { HomePage } from "@/ui/itx-store/views/home";

/**
 * @type {import('react-router').RouteObject[]}
 */
const routes = [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];

export const Routes = createBrowserRouter(routes);
