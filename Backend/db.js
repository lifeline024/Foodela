const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://rajaayush931:LIFE0905LINE@cluster0.cchizhb.mongodb.net/Foodela?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    // Connect without deprecated options
    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB connected successfully");

    // Fetch food items
    const fetchedData = await mongoose.connection.db
      .collection("food_items")
      .find({})
      .toArray();
    global.food_items = fetchedData;
    console.log(`🍽️ Loaded ${global.food_items.length} food items`);

    // Fetch food categories
    const fetchedCategory = await mongoose.connection.db
      .collection("food_category")
      .find({})
      .toArray();
    global.food_category = fetchedCategory;
    console.log(`📦 Loaded ${global.food_category.length} food categories`);
    
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
    throw err;
  }
};

module.exports = mongoDB;
