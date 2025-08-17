
import foodModel from "../models/foodModel.js";
import fs from "fs"; // Note: This import is not used in the provided code snippet.

//Add food item

const addFood = async (req, res) => {
  // A. Add a check to ensure an image was uploaded
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No image file uploaded." });
  }

  // B. Correctly access the filename from the req.file object
  const image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({
      success: true,
      message: "Food item added successfully.",
      filename: image_filename,
    });
  } catch (error) {
    // C. It's a good practice to log the error for debugging purposes
    console.error("Error adding food item:", error);
    res.json({ success: false, message: "Error adding food item." });
  }
};
// all food list
const listFood = async (req,res)=>{
  try {
    const foods = await foodModel.find({})
    res.json({success:true,data:foods})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:'Error'})
    
  }
}

//remove food file
const removeFood = async (req,res)=>
{
try {
  const food = await foodModel.findById(req.body.id)
  fs.unlink(`uploads/${food.image}`,(req,res)=>{})
  await foodModel.findByIdAndDelete(req.body.id)
  res.json({ success: true, message: " Food  Remove Successfully" });
} catch (error) {
console.log(error);
  res.json({ success: false, message: "Error" });
}
}

// search  food item

const searchFood = async (req, res) => {
    try {
        const { query } = req.body;

        // Search for food items where the name or description contains the query string (case-insensitive)
        const food_list = await foodModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });

        res.json({ success: true, data: food_list });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error searching food" });
    }
};

export { searchFood };
export { addFood ,listFood,removeFood};