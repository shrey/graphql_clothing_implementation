export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart_utils = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
export const getCartItemCount = (cartItems) => (
  cartItems.reduce((accumulatorQuantity,cartItem) => (accumulatorQuantity + cartItem.quantity),0)
)
export const getCartItemsTotal = (cartItems) => (
  cartItems.reduce((accumulatorQuantity,cartItem)=>(accumulatorQuantity + cartItem.quantity * cartItem.price),0)
)

export const clearItemFromCart = (cartItems,itemToClear) => (
  cartItems.filter(cartItem => cartItem.id !== itemToClear.id)
)