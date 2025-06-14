const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");

const app = express();
const port = 5000;

// CORS setup (top level)
app.use(cors({
  origin: "https://foodela.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Handle preflight requests
app.options("*", cors());

// Express JSON parser
app.use(express.json());

// Routes
try {
  app.use("/api", require("./Routes/Createuser"));
  app.use("/api", require("./Routes/DisplayData"));
  app.use("/api", require("./Routes/OrderData"));
} catch (err) {
  console.error("❌ Error loading routes:", err.message);
}

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Connect DB then start server
mongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });
