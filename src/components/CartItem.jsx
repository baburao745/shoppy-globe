import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice";
import {
  updateCartItem,
  deleteCartItem,
} from "../services/cartApi";
import { formatPrice } from "../utils/currency";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const productName = item.name || item.title || "Product";

  const productImage =
    item.image ||
    item.thumbnail ||
    "https://via.placeholder.com/150x150?text=Product";

  // Increase quantity
  const handleIncrease = async () => {
    const newQuantity = item.quantity + 1;

    try {
      if (item.cartItemId) {
        await updateCartItem(
          item.cartItemId,
          newQuantity
        );
      }

      dispatch(increaseQuantity(item.id));
    } catch (error) {
      alert(error.message);
    }
  };

  // Decrease quantity
  const handleDecrease = async () => {
    if (item.quantity <= 1) {
      return;
    }

    const newQuantity = item.quantity - 1;

    try {
      if (item.cartItemId) {
        await updateCartItem(
          item.cartItemId,
          newQuantity
        );
      }

      dispatch(decreaseQuantity(item.id));
    } catch (error) {
      alert(error.message);
    }
  };

  // Remove product
  const handleRemove = async () => {
    try {
      if (item.cartItemId) {
        await deleteCartItem(item.cartItemId);
      }

      dispatch(removeFromCart(item.id));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="cart-item">

      {/* Product Image */}
      <img
        src={productImage}
        alt={productName}
        className="cart-item-image"
        onError={(event) => {
          event.currentTarget.src =
            "https://via.placeholder.com/150x150?text=Product";
        }}
      />

      {/* Product Information */}
      <div className="cart-item-info">

        {/* Product Name */}
        <h3>{productName}</h3>

        {/* Price */}
        <p className="cart-item-price">
          {formatPrice(item.price)}
        </p>

        {/* Quantity Controls */}
        <div className="quantity-controls">

          <button
            type="button"
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            type="button"
            onClick={handleIncrease}
            disabled={
              item.stock &&
              item.quantity >= item.stock
            }
          >
            +
          </button>

        </div>

        {/* Subtotal */}
        <p className="cart-subtotal">
          Subtotal:{" "}
          <strong>
            {formatPrice(
              item.price * item.quantity
            )}
          </strong>
        </p>

        {/* Remove */}
        <button
          type="button"
          className="remove-button"
          onClick={handleRemove}
        >
          Remove
        </button>

      </div>
    </div>
  );
}

export default CartItem;