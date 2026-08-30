const USD_TO_INR = 95;

export const formatPrice = (price) => {
  return `₹${Math.round(price * USD_TO_INR).toLocaleString("en-IN")}`;
};