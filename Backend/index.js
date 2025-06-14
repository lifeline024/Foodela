const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");

const app = express();
const port = 5000;

app.use(cors({
  origin: "https://foodela.vercel.app"
}));


app.use(express.json());

// Routes
app.use("/api", require("./Routes/Createuser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Connect to MongoDB first, then start server
mongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(Server started on port ${port});
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
