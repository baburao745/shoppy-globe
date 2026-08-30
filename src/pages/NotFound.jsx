import { Link, useLocation } from "react-router-dom";

function NotFound() {
  const location = useLocation();

  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <div className="error-icon">🔍</div>

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, we couldn't find the page you're looking for.
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