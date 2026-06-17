import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient } from "./query-client";

const PERSISTER_KEY = "react-query-itx-store";

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
  key: PERSISTER_KEY,
});

export const QueryProviderClient = ({ children }) => {
  return (
    <PersistQueryClientProvider
      persistOptions={{ persister }}
      client={queryClient}
      key={PERSISTER_KEY}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
