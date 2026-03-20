import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import Hero from "./pages/HeroPage";
import ProductDetail from "./pages/ProductDetail";
import ProductCategory from "./pages/ProductCategory";
import SearchedProducts from "./pages/SearchedProducts";
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
        {
          path: "productDetail/:id",
          element: <ProductDetail />,
        },
        {
          path: "category/:category",
          element: <ProductCategory />,
        },
        {
          path: "search",
          element: <SearchedProducts />,
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
