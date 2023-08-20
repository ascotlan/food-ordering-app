// Client facing scripts here

//remove item from cart
const removeItem = (itemId, restaurantId) => {
  window.location.href = `/api/widgets/order_items/${itemId}/delete?id=${restaurantId}`;
};
