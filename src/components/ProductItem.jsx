import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cartSlice";

function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <article className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
      />

      <div className="product-info">
        <h3>{product.title}</h3>

        <p className="product-price">
          ${product.price}
        </p>

        <p>⭐ {product.rating}</p>

        <div className="product-actions">
          <Link to={`/product/${product.id}`}>
            View Details
          </Link>

          <button onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductItem;