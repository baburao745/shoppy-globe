import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const items = useSelector((state) => state.cart.items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="header">
      <Link to="/" className="logo">
        🛍️ ShoppyGlobe
      </Link>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        <Link to="/cart">
          🛒 Cart
          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Header;