import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../store/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      <img
        src={item.thumbnail}
        alt={item.title}
        loading="lazy"
      />

      <div className="cart-item-info">
        <h3>{item.title}</h3>
        <p>${item.price}</p>

        <div className="quantity-controls">
          <button
            onClick={() => dispatch(decreaseQuantity(item.id))}
            disabled={item.quantity === 1}
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => dispatch(increaseQuantity(item.id))}
          >
            +
          </button>
        </div>

        <button
          className="remove-button"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItem;