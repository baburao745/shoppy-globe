import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        🛍️ ShoppyGlobe
      </Link>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">🛒 Cart</Link>
      </nav>
    </header>
  );
}

export default Header;