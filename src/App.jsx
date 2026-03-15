import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import Hero from "./pages/HeroPage";

export default function App() {
  const query = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Hero />,
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={query}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
