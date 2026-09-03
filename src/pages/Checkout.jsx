import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/cartSlice";
import { formatPrice } from "../utils/currency";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  // Calculate total
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate total quantity
  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Handle input changes
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // Place order
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.address) {
      setMessage("Please fill in all the details.");
      return;
    }

    setMessage("Order placed successfully! 🎉");

    // Clear cart after successful order
    dispatch(clearCart());

    // Go back to home page
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  // Empty cart
  if (items.length === 0 && !message) {
    return (
      <main className="checkout-page empty-checkout">
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your Cart is Empty</h1>

          <p>
            Add some products before checking out.
          </p>

          <button
            type="button"
            className="shop-button"
            onClick={() => navigate("/products")}
          >
            Start Shopping →
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">

      <section className="checkout-card">

        {/* Heading */}
        <div className="checkout-heading">
          <p>ALMOST THERE 🇮🇳</p>

          <h1>Checkout</h1>

          <span>
            Complete your details to place your order
          </span>
        </div>

        {/* Success / Error Message */}
        {message && (
          <div className="order-message">
            {message}
          </div>
        )}

        {!message && (
          <div className="checkout-layout">

            {/* Customer Details */}
            <div className="checkout-form-section">

              <h2>Delivery Details</h2>

              <form onSubmit={handleSubmit}>

                {/* Name */}
                <div className="checkout-form-group">
                  <label htmlFor="name">
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div className="checkout-form-group">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                {/* Address */}
                <div className="checkout-form-group">
                  <label htmlFor="address">
                    Delivery Address
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter your complete delivery address"
                    rows="5"
                  />
                </div>

                {/* Error message */}
                {message && (
                  <p className="checkout-error">
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  className="place-order-button"
                >
                  Place Order 🎉
                </button>

              </form>
            </div>

            {/* Order Summary */}
            <aside className="checkout-summary">

              <h2>Order Summary</h2>

              <p className="checkout-items-count">
                {totalItems} item(s)
              </p>

              {/* Products */}
              <div className="checkout-products">

                {items.map((item) => (
                  <div
                    className="checkout-item"
                    key={item.id}
                  >
                    <div>
                      <strong>
                        {item.name || item.title || "Product"}
                      </strong>

                      <span>
                        × {item.quantity}
                      </span>
                    </div>

                    <strong>
                      {formatPrice(
                        item.price * item.quantity
                      )}
                    </strong>
                  </div>
                ))}

              </div>

              <div className="checkout-divider"></div>

              {/* Subtotal */}
              <div className="checkout-summary-row">
                <span>Subtotal</span>

                <span>
                  {formatPrice(total)}
                </span>
              </div>

              {/* Delivery */}
              <div className="checkout-summary-row">
                <span>Delivery</span>

                <strong className="free-delivery">
                  FREE
                </strong>
              </div>

              <div className="checkout-divider"></div>

              {/* Total */}
              <div className="checkout-total">
                <strong>Total</strong>

                <strong>
                  {formatPrice(total)}
                </strong>
              </div>

            </aside>

          </div>
        )}

      </section>

    </main>
  );
}

export default Checkout;