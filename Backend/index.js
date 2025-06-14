const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");

const app = express();
const port = 5000;

// ✅ CORS middleware at the very top
app.use(cors({
  origin: "https://foodela.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Explicitly handle preflight requests
app.options("*", cors({
  origin: "https://foodela.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Add headers manually (fallback)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://foodela.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());

// Routes
app.use("/api", require("./Routes/Createuser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start server after DB connection
mongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
