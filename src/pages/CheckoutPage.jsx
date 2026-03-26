import { useSelector } from "react-redux";
import { Form, useActionData, redirect } from "react-router-dom";
import Modal from "../components/modal";

export async function checkoutAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  const errors = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!data.email || !data.email.includes("@")) {
    errors.email = "Enter a valid email";
  }

  if (!data.street) {
    errors.street = "Street is required";
  }

  if (!data.postalcode || data.postalcode.length < 5) {
    errors.postalcode = "Postal coode must be at least 5 characters";
  }

  if (!data.city) {
    errors.city = "City is required";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  if (!errors) {
  }

  return { success: true };
}

export default function Checkout() {
  const cartData = useSelector((state) => state.cartProducts.cartItems);
  const subTotalPrice = cartData.reduce(
    (acc, item) => acc + item.totalPrice,
    0,
  );
  const errors = useActionData();

  return (
    <>
      <div className="center">
        <h1 className="regular-heading">Checkout</h1>

        <Form method="post">
          <h4 className="subTotalPrice">
            Total Price: ${Math.round(subTotalPrice)}/-
          </h4>
          <div className="in-w">
            <label>
              {errors?.name ? (
                <p className="error">{errors.name}</p>
              ) : (
                "Full name"
              )}
            </label>
            <input type="text" name="name" placeholder="Name" />
          </div>

          <div className="in-w">
            <label>
              {errors?.email ? (
                <p className="error">{errors.email}</p>
              ) : (
                "Email Address"
              )}
            </label>
            <input type="email" name="email" placeholder="Email" />
          </div>

          <div className="in-w">
            <label>
              {errors?.street ? (
                <p className="error">{errors.street}</p>
              ) : (
                "Street"
              )}
            </label>
            <input type="text" name="street" placeholder="Street" />
          </div>

          <div className="s-in-w">
            <div>
              <label>
                {errors?.postalcode ? (
                  <span className="error">{errors.postalcode}</span>
                ) : (
                  "Postal Code"
                )}
              </label>
              <input
                type="number"
                name="postalcode"
                placeholder="Postal code"
              />
            </div>

            <div>
              <label>
                {errors?.city ? (
                  <span className="error">{errors.city}</span>
                ) : (
                  "City"
                )}
              </label>
              <input type="text" name="city" placeholder="City" />
            </div>
          </div>

          <div className="action-btn">
            <button type="submit">Submit Order</button>
          </div>
        </Form>
      </div>
      <Modal />
    </>
  );
}
