export const addItem = (cartItems, itemToAdd) => {
  const existingItem = cartItems.find(item => item.id === itemToAdd.id);

  if (existingItem) {
    return cartItems.map(cartItem =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }]
};

export const removeItem = (cartItems, itemToRemove) => {
  const existingItem = cartItems.find(cartItem => cartItem.id === itemToRemove.id);

  if (existingItem.quantity === 1) {
    return clearItemFromCart(cartItems, itemToRemove);
  }

  return cartItems.map(cartItem =>
    cartItem.id === itemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  );
};

export const clearItemFromCart = (cartItems, item) => cartItems.filter(cartItem => cartItem.id !== item.id);