const USD_TO_INR = 1;

export const formatPrice = (price) => {
  return `₹${Math.round(price * USD_TO_INR).toLocaleString("en-IN")}`;
};