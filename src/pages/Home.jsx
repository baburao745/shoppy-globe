import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">WELCOME TO SHOPPYGLOBE</p>

          <h1>Everything You Love, In One Place.</h1>

          <p>
            Discover amazing products, explore great deals,
            and enjoy a simple shopping experience.
          </p>

          <Link to="/products" className="shop-button">
            Shop Now →
          </Link>
        </div>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <span>🚚</span>
          <h3>Fast Delivery</h3>
          <p>Get your products delivered quickly.</p>
        </div>

        <div className="feature-card">
          <span>🔒</span>
          <h3>Secure Shopping</h3>
          <p>Enjoy a safe and reliable shopping experience.</p>
        </div>

        <div className="feature-card">
          <span>⭐</span>
          <h3>Quality Products</h3>
          <p>Discover products you'll love.</p>
        </div>
      </section>

      <section className="home-cta">
        <h2>Ready to explore?</h2>

        <p>
          Browse our collection and find something special.
        </p>

        <Link to="/products" className="shop-button">
          Explore Products
        </Link>
      </section>
    </main>
  );
}

export default Home;