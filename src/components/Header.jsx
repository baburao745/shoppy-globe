import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Check if user is logged in
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/login");

    // Refresh header so Login/Register appear again
    window.location.reload();
  };

  return (
    <header className="header">

      {/* Logo */}
      <Link to="/" className="logo">
        🛍️ ShoppyGlobe
      </Link>

      {/* Navigation */}
      <nav className="nav">

        <Link to="/">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">
          🛒 Cart

          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Authentication */}
        {!token ? (
          <>
            <Link
              to="/login"
              className="login-link"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="register-link"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="welcome-user">
              👋 {username}
            </span>

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

      </nav>
    </header>
  );
}

export default Header;