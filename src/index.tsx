import "./index.sass";
import { createRoot } from "react-dom/client";
import { Main } from "./main.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Main />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
