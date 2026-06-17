import { RouterProvider } from "react-router";
import "./App.css";
import { QueryProviderClient } from "./ui/common/util/query-client/query-client-provider";
import { ReactQueryDevtools } from "node_modules/@tanstack/react-query-devtools/build/legacy/_tsup-dts-rollup";
import { Routes } from "./ui/common/routes/routes";
import { CartProvider } from "./ui/common/context/cart-context/cart-context-provider";

function App() {
  return (
    <QueryProviderClient>
      <CartProvider>
        <RouterProvider router={Routes} />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      </CartProvider>
    </QueryProviderClient>
  );
}

export default App;
