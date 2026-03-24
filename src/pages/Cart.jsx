import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import Products from "../components/Products";
import { useEffect } from "react";
import { getProducts } from "../store/fetchRandomProducts";
import emptyCart from "../asset/empty-cart.png";

export default function Cart() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartProducts.cartItems);
  const { productsData } = useSelector((state) => state.products);
  const totalItem = useSelector((state) => state.cartProducts.totalQuantity);

  function handleIncrement(id) {
    dispatch(cartActions.handleAddQuantity(id));
  }

  function handleDecrement(id) {
    dispatch(cartActions.handleDecQuantity(id));
  }

  console.log(cartData.length);

  useEffect(() => {
    dispatch(getProducts(18));
  }, []);

  return (
    <>
      <div className="cart-container">
        <div>
          <h2 className="regular-heading mr">
            {cartData.length <= 0 ? "Your cart is empty" : "Shopping Cart"}
          </h2>

          <div className="cart-main-w">
            <div>
              {cartData.length <= 0 && (
                <div className="centre">
                  <div className="empty-cart-w">
                    <img src={emptyCart} alt={"Your cart is empty"} />
                    <p>
                      Your cart is empty explore products and add them into your
                      cart!
                    </p>
                  </div>
                </div>
              )}

              {cartData.length > 0 &&
                cartData.map((product) => (
                  <div className="cart-products-w" key={product.id}>
                    <div className="cart-img-w">
                      <img src={product.img} alt={product.title} />
                    </div>

                    <div className="cart-content">
                      <h3>{product.title}</h3>
                      <p className="description-d">{product.description}</p>

                      <div className="cart-quantity">
                        <button onClick={() => handleDecrement(product.id)}>
                          -
                        </button>
                        <p>{product.quantity}</p>
                        <button onClick={() => handleIncrement(product.id)}>
                          +
                        </button>
                      </div>
                    </div>

                    <h3 className="cart-p-price">
                      $ {Math.round(product.totalPrice)}/-
                    </h3>
                  </div>
                ))}
            </div>

            {cartData.length > 0 && (
              <div className="proceed">
                <div className="flex">
                  <h3>{`Subtotal (${totalItem} items) :`}</h3>
                  <h4 className="cart-price">{`$ ${Math.round(totalItem)}/-`}</h4>
                </div>
                <p>Inclusive of all taxes</p>
                <button className="btn light buy-btn">Proceed to buy</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Products append={productsData} heading={"Explore our products"} />
    </>
  );
}
