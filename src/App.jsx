import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Layout } from "./pages/Layout";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { Secret } from "./pages/Secret";

import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import MusicPage from "./pages/music/index";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60
      },
    },
  })
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/images" element={<MusicPage />} />
            <Route path="/images/:id" element={<Secret />} />
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <Secret />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
