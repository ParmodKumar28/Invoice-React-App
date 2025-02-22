export const calculateDiscount = (price, qty, discountPercentage) => {
    return (price * qty * discountPercentage) / 100;
  };
  
  export const calculateTax = (price, qty, discount, taxPercentage) => {
    return ((price * qty - discount) * taxPercentage) / 100;
  };
  
  export const calculateTotal = (price, qty, discount, tax) => {
    return price * qty - discount + tax;
  };