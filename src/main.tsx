import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme-provider.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>

 <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

    <Provider store={store}>
      <SnackbarProvider autoHideDuration={3000}>
        <QueryClientProvider client={queryClient}>

         

            <App />

          
          
        </QueryClientProvider>
      </SnackbarProvider>
    </Provider>

    </ThemeProvider>
  </StrictMode>
);
