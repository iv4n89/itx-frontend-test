import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "@/ui/common/components/layout/layout";
import { HomeView } from "@/ui/itx-store/views/home";
import { DetailsView } from "@/ui/itx-store/views/details";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomeView /> },
      { path: "/product/:id", element: <DetailsView /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
