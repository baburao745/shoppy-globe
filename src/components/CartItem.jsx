import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice";
import { formatPrice } from "../utils/currency";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      {/* Product Image */}
      <img
        src={item.thumbnail}
        alt={item.title}
      />

      {/* Product Information */}
      <div className="cart-item-info">
        <h3>{item.title}</h3>

        {/* Product Price */}
        <p className="cart-item-price">
          {formatPrice(item.price)}
        </p>

        {/* Quantity Controls */}
        <div className="quantity-controls">
          <button
            type="button"
            onClick={() =>
              dispatch(decreaseQuantity(item.id))
            }
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            type="button"
            onClick={() =>
              dispatch(increaseQuantity(item.id))
            }
          >
            +
          </button>
        </div>

        {/* Subtotal */}
        <p className="cart-subtotal">
          Subtotal:{" "}
          <strong>
            {formatPrice(item.price * item.quantity)}
          </strong>
        </p>

        {/* Remove */}
        <button
          type="button"
          className="remove-button"
          onClick={() =>
            dispatch(removeFromCart(item.id))
          }
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;