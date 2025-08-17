import userModel from "../models/userModel.js";

// add to cart to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    // let userData = await userModel.findById(req.body.userId ); another method
    // console.log(req.body.userId);
    // console.log(userData);

    let cartData = await userData.cartData;
    // console.log(cartData);
    // console.log(cartDate);
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error not added" });
  }
};

// //remove items to from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById( req.body.userId );
    let cartData = await userData.cartData;

    if ( cartData[req.body.itemId ] >0) {
      cartData[req.body.itemId] -= 1;
       console.log(cartData);
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from Cart" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error not Removed" });
  }
  
};

//fetch user cart data
const getCart = async (req, res) => {
   try {
    let userData = await userModel.findById(req.body.userId );
    let cartData = await userData.cartData;
    res.json({ success: true, cartData});

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error not get" });
  } 
};

export { addToCart, removeFromCart, getCart };
