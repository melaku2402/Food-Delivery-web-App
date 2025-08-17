import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
 console.log("Frontend orderItems array:", orderItems);

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2// Corrected addition
    };
    
    try {
      let response = await axios.post(url+"/api/order/place",orderData,{ headers: {token} });
      console.log(orderData);
      console.log(response);
      
      
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
        
      } else {
        alert("Error placing order");
      }
      
    } catch (error) {
      console.error("Network or server error:", error);
      alert("Error placing order. Please try again.");
    }
  };
  // useEffect(() => {console.log(data)}, [data]) //check data
const navigate = useNavigate()

useEffect(() => {
  if(!token){
    navigate("/cart")
  }
  else if(getTotalCartAmount()===0) {
   navigate("/cart")
  }
}, [token])


  return (
    <div>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First name"
              required
            />
            <input
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last name"
              required
            />
          </div>

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            required
            placeholder="Email address"
          />
          <input
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            required
            placeholder="Street"
          />
          <div className="multi-fields">
            <input
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              required
              placeholder="City"
            />
            <input
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              required
              placeholder="State"
            />
          </div>

          <div className="multi-fields">
            <input
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              type="text"
              required
              placeholder="Zip code"
            />
            <input
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              required
              placeholder="country"
            />
          </div>

          <input
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            required
            placeholder="Phone"
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>💵{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery fee</p>
                <p>💵{getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>💵{getTotalCartAmount() && getTotalCartAmount() + 2}</p>
              </div>
              <hr />
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
