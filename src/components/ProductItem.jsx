import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { addCartItem } from "../services/cartApi";
import { formatPrice } from "../utils/currency";

function ProductItem({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productId = product._id || product.id;
  const productName = product.name || product.title || "Product";

  const productImage =
    product.image ||
    product.thumbnail ||
    "https://via.placeholder.com/300x200?text=Product";

  const discount = product.discountPercentage || 0;

  const discountedPrice =
    product.price -
    (product.price * discount) / 100;

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    // User must be logged in
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // Add product to MongoDB cart
      const data = await addCartItem(productId, 1);

      // Get the MongoDB cart item's ID
      const cartItemId = data.cartItem?._id || null;

      // Update local Redux cart
      dispatch(
        addToCart({
          id: productId,
          cartItemId: cartItemId,
          name: productName,
          price: discountedPrice,
          image: productImage,
          description: product.description,
          stock: product.stock,
          quantity: 1,
        })
      );

      alert("Product added to cart!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="product-card">

      {/* Discount */}
      {discount > 0 && (
        <span className="discount-badge">
          🔥 {discount}% OFF
        </span>
      )}

      {/* Product */}
      <Link to={`/product/${productId}`}>

        {/* Product Image */}
        <img
          src={productImage}
          alt={productName}
          className="product-image"
          onError={(event) => {
            event.currentTarget.src =
              "https://via.placeholder.com/300x200?text=Product";
          }}
        />

        <div className="product-info">

          {/* Brand */}
          <p className="product-brand">
            {product.brand}
          </p>

          {/* Name */}
          <h3>{productName}</h3>

          {/* Rating */}
          <p className="product-rating">
            ⭐ {product.rating}
          </p>

          {/* Discounted Price */}
          <div className="product-price">
            <strong>
              {formatPrice(discountedPrice)}
            </strong>
          </div>

          {/* Stock */}
          <p className="product-stock">
            {product.stock > 0
              ? `📦 ${product.stock} items available`
              : "❌ Out of stock"}
          </p>

          {/* Availability */}
          <p className="availability-status">
            {product.availabilityStatus}
          </p>

        </div>
      </Link>

      {/* Add To Cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
      >
        {product.stock > 0
          ? "Add to Cart 🛒"
          : "Out of Stock"}
      </button>

    </div>
  );
}

export default ProductItem;