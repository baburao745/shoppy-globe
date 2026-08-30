import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { formatPrice } from "../utils/currency";

function Cart() {
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="cart-page empty-cart">
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your Cart is Empty</h1>

          <p>
            Looks like you haven't added anything to your
            cart yet.
          </p>

          <Link to="/products" className="shop-button">
            Start Shopping →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <section className="cart-header">
        <p>YOUR SHOPPING BAG</p>

        <h1>Shopping Cart</h1>

        <span>{totalItems} item(s)</span>
      </section>

      <section className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row total-row">
            <strong>Total</strong>

            <strong>
              {formatPrice(total)}
            </strong>
          </div>

          <Link
            to="/checkout"
            className="checkout-button"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </section>
    </main>
  );
}

export default Cart;