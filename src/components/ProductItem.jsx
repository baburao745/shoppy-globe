import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import { formatPrice } from "../utils/currency";

function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleImageError = (event) => {
    event.currentTarget.src =
      "https://via.placeholder.com/300x220?text=Product";
  };

  return (
    <article className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
        onError={handleImageError}
      />

      <div className="product-info">
        <h3>{product.title}</h3>

        <p className="product-price">
          {formatPrice(product.price)}
        </p>

        <p>⭐ {product.rating}</p>

        <p className="product-discount">
          {product.discountPercentage}% OFF
        </p>

        <p className="stock-status">
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <div className="product-actions">
          <Link to={`/product/${product.id}`}>
            View Details
          </Link>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductItem;