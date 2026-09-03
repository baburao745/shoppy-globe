const API_URL = "http://localhost:5000/cart";

export async function addCartItem(productId, quantity = 1) {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add item to cart");
  }

  return data;
}

export async function updateCartItem(cartItemId, quantity) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${cartItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      quantity,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update cart");
  }

  return data;
}

export async function deleteCartItem(cartItemId) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete cart item");
  }

  return data;
}