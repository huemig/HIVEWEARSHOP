import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, updateCart } from "../redux/cart/cartslice";
import Headers from "../components/header";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

const Orders = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [quantities, setQuantities ] = useState({})

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(()=> {
    const initialQuantities = items.reduce((acc , item) => {
      acc[item.id] = item.quantity
      return acc
    }, {})
    setQuantities(initialQuantities)
  }, [items])

  const handleDeleteCartItem = (itemId) => {
    dispatch(updateCart({ quantity: 0, product: itemId }));
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return(...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(()=> {
        func.apply(null, args);
      }, delay)
    }
  };
  const debouncedUpdateCart = useCallback(
    debounce((itemId, quantity) => {
      dispatch(updateCart({ quantity, product: itemId }))
    }, 3500),
    [dispatch]
  );
  const handleAmountChange = (e, itemId) => {
    const value = e.target.value;
    setQuantities({...quantities, [itemId]: value });
    if(!isNaN(value) && value >= 0) {
      const quantity = value === '' ? 0 : parseInt(value, 10)
      debouncedUpdateCart(itemId, quantity);
    }
  }

  

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // const increment = (currentQuantity, itemId) => {
  //   const quantity = parseInt(currentQuantity, 10) + 1;
  //   dispatch(updateCart({ quantity, product: itemId }));
  // };

  // const decrement = (currentQuantity, itemId) => {
  //   const quantity = Math.max(parseInt(currentQuantity, 10) - 1, 0);
  //   dispatch(updateCart({ quantity, product: itemId }));
  // };

  //   if (status === "pending") {
  //     return <div className="loading">Loading...</div>;
  //   }

  //   if (error) {
  //     return <div className="error">Error: {error}</div>;
  //   }

  return (
    <>
      <Headers />

      <div className="cart-container">
        <h1>Cart</h1>

        {items && items.length === 0 ? (
          <div className="empty-cart">Your cart is empty</div>
        ) : (
          <div>
            {items &&
              items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="img-container">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  <div className="item-details">
                    <div className="item-name">{item.product.name}</div>
                    {/* <div className="item-price">{item.product.price}</div> */}
                    <div className="item-quantity">
                      Quantity: {item.quantity}
                    </div>
                    <div className="totql-price"></div>
                  </div>

                  <label>Count</label>

                  <input
                    className="quantity-input"
                    onChange={(e) => handleAmountChange(e, item.id)}
                    type="number"
                    value={item.quantity}
                  ></input>

                  <button
                    onClick={() => handleDeleteCartItem(item.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div className="total-price">Total Price: ${totalPrice.toFixed(2)}</div>
              <div className="buttons-container">
            <button>
              <Link to="/products">Products</Link>
            </button>
            <button>
              <Link to="/checkout">Checkout</Link>
            </button>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Orders;

