import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { formatPrice } from "../utils/currency";

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
          `http://localhost:5000/products/${id}`
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
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <h2>Loading product...</h2>
          <p>Please wait...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-detail-page">
        <h1>Product Not Found</h1>
        <p>{error || "The requested product could not be found."}</p>

        <Link to="/products" className="back-link">
          ← Back to Products
        </Link>
      </main>
    );
  }

  const productImage =
    product.image ||
    "https://via.placeholder.com/500x500?text=Product";

  const discount = product.discountPercentage || 0;

  const discountedPrice =
    product.price - (product.price * discount) / 100;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: discountedPrice,
        image: product.image,
        description: product.description,
        stock: product.stock,
      })
    );
  };

  return (
    <main className="product-detail-page">

      {/* Back Button */}
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

      <section className="detail-card">

        {/* Product Image */}
        <div className="detail-image">

          {discount > 0 && (
            <span className="discount-badge">
              🔥 {discount}% OFF
            </span>
          )}

          <img
            src={productImage}
            alt={product.name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src =
                "https://via.placeholder.com/500x500?text=Product";
            }}
          />
        </div>

        {/* Product Information */}
        <div className="detail-info">

          {/* Brand */}
          <p className="product-brand">
            {product.brand}
          </p>

          {/* Product Name */}
          <h1>{product.name}</h1>

          {/* Rating */}
          <div className="detail-rating">
            ⭐ {product.rating} / 5
          </div>

          {/* Description */}
          <p className="detail-description">
            {product.description}
          </p>

          {/* Discount */}
          {discount > 0 && (
            <p className="detail-discount">
              🔥 {discount}% OFF
            </p>
          )}

          {/* Price */}
          <h2 className="detail-price">
            {formatPrice(discountedPrice)}
          </h2>

          {/* Stock */}
          <p className="stock-status">
            {product.stock > 0
              ? `📦 ${product.stock} items available`
              : "❌ Out of stock"}
          </p>

          {/* Availability */}
          <p className="detail-availability">
            {product.availabilityStatus}
          </p>

          {/* Minimum Order */}
          <p className="minimum-order">
            Minimum order: {product.minimumOrderQuantity}
          </p>

          {/* SKU */}
          <p className="product-sku">
            SKU: {product.sku}
          </p>

          {/* Add To Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="add-cart-button"
          >
            {product.stock > 0
              ? "Add to Cart 🛒"
              : "Out of Stock"}
          </button>

        </div>
      </section>
    </main>
  );
}

export default ProductDetail;