const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { authMiddleware, errorMiddleware } = require("./middlewares");
require("dotenv").config(); 


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use(errorMiddleware);


app.get("/", (req, res) => {
  res.send("Backend is working!");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
