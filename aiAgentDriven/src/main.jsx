import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { CartProvider } from "@/ui/common/context/cart-context/cart-context-provider";
import App from "./App.jsx";
import "./index.css";

const ONE_HOUR = 1000 * 60 * 60;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_HOUR,
      gcTime: ONE_HOUR,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <CartProvider>
        <App />
      </CartProvider>
    </PersistQueryClientProvider>
  </StrictMode>
);
