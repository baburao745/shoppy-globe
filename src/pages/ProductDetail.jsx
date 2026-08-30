import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

function ProductDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="product-detail-page">
        <h2>Loading product...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="product-detail-page">
        <h1>Product Not Found</h1>
        <p>{error}</p>
        <Link to="/products">Back to Products</Link>
      </main>
    );
  }

  return (
    <main className="product-detail-page">
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

      <section className="detail-card">
        <div className="detail-image">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
          />
        </div>

        <div className="detail-info">
          <span>{product.category}</span>

          <h1>{product.title}</h1>

          <p className="detail-brand">
            Brand: {product.brand || "N/A"}
          </p>

          <p className="detail-rating">
            ⭐ {product.rating}
          </p>

          <p className="detail-description">
            {product.description}
          </p>

          <h2>${product.price}</h2>

          <p>
            Discount: {product.discountPercentage}%
          </p>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="add-cart-button"
          >
            Add to Cart 🛒
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;