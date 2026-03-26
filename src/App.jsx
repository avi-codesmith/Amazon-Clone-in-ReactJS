import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import Hero from "./pages/HeroPage";
import ProductDetail from "./pages/ProductDetail";
import ProductCategory from "./pages/ProductCategory";
import SearchedProducts from "./pages/SearchedProducts";
import Cart from "./pages/Cart";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Checkout, { checkoutAction } from "./pages/CheckoutPage";
export default function App() {
  const cartData = useSelector((state) => state.cartProducts.cartItems);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

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
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "checkout",
          element: <Checkout />,
          action: checkoutAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
