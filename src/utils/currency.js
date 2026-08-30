const USD_TO_INR = 70;

export const formatPrice = (price) => {
  return `₹${Math.round(price * USD_TO_INR).toLocaleString("en-IN")}`;
};