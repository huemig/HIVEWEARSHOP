import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getOrder, addOrder } from "../redux/orders/checkoutSlice";
import { addOrder } from "../redux/checkout/checkoutslice";
// import { useNavigate } from "react-router-dom";
import Headers from "../components/header";
import { fetchCart } from "../redux/cart/cartslice";
import Footer from "../components/footer"

const Checkout = () => {
  // const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  
  const [newOrder, setNewOrder] = useState({
    customer_name: user.name,
    phone_number: "",
    zip_code: "",
    building: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.product.price, 0);

    const orderPayload = {
      ...newOrder,
      total_quantity: totalQuantity,
      total_price: totalPrice,
      user: user.id,
    };

    console.log("Order Payload: ", orderPayload);
    try {
    dispatch(addOrder(orderPayload));
      setNewOrder({
        customer_name: user.name,
        phone_number: "",
        zip_code: "",
        building: "",
        city: "",
        state: "",
      })
    } catch (error) {
      console.log("error checking out", error)
    }
  };

  return (
    <>
      <Headers />
      <div className="checkout-box">
        {/* <h1>Orders</h1>
      {orderStatus === "loading" && <p>Loading...</p>}
      {orderStatus === "failed" && <p>Error: {error}</p>} */}
        {/* <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.customer_name} - {order.total_price}
          </li>
        ))}
      </ul> */}

        <h2>Add a new order</h2>

        <form onSubmit={handleSubmit} className="checkout_form">
          <div className="row">
            <div className="col-25">
              <label>Name:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="customer_name"
                value={newOrder.customer_name}
                onChange={handleChange}
                placeholder={user.name}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Number:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="phone_number"
                value={newOrder.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Zip:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="zip_code"
                value={newOrder.zip_code}
                onChange={handleChange}
                placeholder="Zip Code"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Street address:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="building"
                value={newOrder.building}
                onChange={handleChange}
                placeholder="Building"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>City:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="city"
                value={newOrder.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>State:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="state"
                value={newOrder.state}
                onChange={handleChange}
                placeholder="State"
              />
            </div>
          </div>
          <br />

          <div className="row">
            <button type="submit">Odrder</button>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default Checkout;