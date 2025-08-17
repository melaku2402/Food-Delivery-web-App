import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets';
// import { useState } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {

    // const [itemCount, setItemCount] = useState(0)
    const { cartItems, setCartItems,addToCart,url,removeFromCart} = useContext(StoreContext)
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={ url +"/images/"+image} alt="" className="food-item-image" />
        {
          //  !itemCount
          !cartItems[id] ? (
            //  setItemCount instead of this fun use addToCart fun
            <img
              className="add"
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
            />
          ) : (
            <div className="food-item-counter">
              {/* instead of setItemCount((prev) => prev - 1) use removeFromCart fun  */}
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt=""
             />
              {/* <p>{itemCount}</p> instead of this */}
              <p>{cartItems[id]}</p>
              {/* setItemCount((prev) => prev + 1) instead of this use addtocart */}
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt=""
              />
            </div>
          )
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem