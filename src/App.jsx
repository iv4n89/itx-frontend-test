import { RouterProvider } from "react-router";
import "./App.css";
import { QueryProviderClient } from "./ui/common/util/query-client/query-client-provider";
import { ReactQueryDevtools } from "node_modules/@tanstack/react-query-devtools/build/legacy/_tsup-dts-rollup";

function App() {
  return (
    <QueryProviderClient>
      <RouterProvider router={{}} />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryProviderClient>
  );
}

export default App;
