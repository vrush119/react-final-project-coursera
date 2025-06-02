import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
 
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
 // alert(`Cart Items: ${JSON.stringify(cart)}`);
    //let total1 = cart.reduce((total, item) => total + (item.cost * item.quantity), 0).toFixed(2);
   let total1 = cart.reduce((sum, item) => {
  const cost = parseFloat(String(item.cost).replace(/[^0-9.]/g, '')); // remove ₹ or any non-numeric
  const quantity = Number(item.quantity); // ensure number
  return sum + (cost * quantity);
}, 0).toFixed(2); // round to 2 decimal places

//alert(`Total Cost: ₹${total1}`);

    // If total1 is NaN, return 0
    if (isNaN(total1)) {
      return 0;
    }else{
        return total1;
    }
    
  };

  const handleContinueShopping = (e) => {
    onContinueShopping();
  };



  const handleIncrement = (item) => {
    //alert(`Incrementing quantity for ${item.name}`);
    dispatch(updateQuantity({ name: item.name, quantity: Number(item.quantity) + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: Number(item.quantity) - 1 }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(String(item.cost).replace(/[^0-9.]/g, '')); // remove ₹ or any non-numeric
    const quantity = Number(item.quantity);

    if (isNaN(cost)) {
      return 0;
    }else{
   // return (item.cost * item.quantity).toFixed(2);
   
     const total = cost * quantity;
  
  // Return number, not string
  return Number(total.toFixed(2));
    }
    
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


