const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require('./routes/blogs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api', blogsRouter); // use blogs router as middleware for all routes starting with /api


mongoose.connect("mongodb+srv://blog01:F1967MqysyZ94Zme@cluster0.1sx0eya.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
