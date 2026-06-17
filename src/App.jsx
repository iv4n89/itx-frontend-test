import { RouterProvider } from "react-router";
import "./App.css";
import { QueryProviderClient } from "./ui/common/util/query-client/query-client-provider";
import { ReactQueryDevtools } from "node_modules/@tanstack/react-query-devtools/build/legacy/_tsup-dts-rollup";
import { Routes } from "./ui/common/routes/routes";

function App() {
  return (
    <QueryProviderClient>
      <RouterProvider router={Routes} />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryProviderClient>
  );
}

export default App;
