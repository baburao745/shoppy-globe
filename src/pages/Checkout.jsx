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

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.address) {
      setMessage("Please fill in all the details.");
      return;
    }

    setMessage("Order placed successfully! 🎉");

    dispatch(clearCart());

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  if (items.length === 0 && !message) {
    return (
      <main className="checkout-page empty-checkout">
        <h1>Your cart is empty</h1>

        <p>
          Add some products before checking out.
        </p>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-card">
        <div className="checkout-heading">
          <p>ALMOST THERE</p>

          <h1>Checkout</h1>
        </div>

        {message && (
          <div className="order-message">
            {message}
          </div>
        )}

        {!message && (
          <>
            <form onSubmit={handleSubmit}>
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

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              <label htmlFor="address">
                Address
              </label>

              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your delivery address"
                rows="4"
              />

              <button type="submit">
                Place Order
              </button>
            </form>

            <aside className="checkout-summary">
              <h2>Order Summary</h2>

              {items.map((item) => (
                <div
                  className="checkout-item"
                  key={item.id}
                >
                  <span>
                    {item.title} × {item.quantity}
                  </span>

                  <span>
                    {formatPrice(
                      item.price * item.quantity
                    )}
                  </span>
                </div>
              ))}

              <div className="checkout-total">
                <strong>Total</strong>

                <strong>
                  {formatPrice(total)}
                </strong>
              </div>
            </aside>
          </>
        )}
      </section>
    </main>
  );
}

export default Checkout;