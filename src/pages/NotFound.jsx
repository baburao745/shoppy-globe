import { Link, useLocation } from "react-router-dom";

function NotFound() {
  const location = useLocation();

  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <div className="error-icon">🛍️</div>

        <p className="error-label">ERROR 404</p>

        <h1>Page Not Found</h1>

        <p>
          Sorry, the page you are looking for doesn't exist
          or may have been moved.
        </p>

        <p className="invalid-route">
          Invalid URL: <strong>{location.pathname}</strong>
        </p>

        <Link to="/" className="shop-button">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;