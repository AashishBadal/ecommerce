import React, { useContext } from 'react';
import { CartContext } from '../context';

const CartSidebar = () => {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, checkout } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2);

  return (
    <>
      <div className={`cart-sidebar ${isCartOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-cart" onClick={toggleCart}>×</button>
        </div>
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={item.id} className="cart-item">
              <span>{item.name} - ${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
              <div className="quantity-controls">
                <button className="quantity-btn" onClick={() => updateQuantity(index, -1)}>-</button>
                <span>{item.quantity}</span>
                <button className="quantity-btn" onClick={() => updateQuantity(index, 1)}>+</button>
              </div>
              <button className="remove-item" onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="cart-total">Total: ${total}</div>
          <button className="checkout-btn" onClick={checkout}>Checkout</button>
        </div>
      </div>
      <div className={`overlay ${isCartOpen ? 'active' : ''}`} onClick={toggleCart}></div>
    </>
  );
};

export default CartSidebar;