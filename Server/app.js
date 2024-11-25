const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { authMiddleware, errorMiddleware } = require("./middlewares");
require("dotenv").config(); 
const {sequelize} = require("./models");

const cardRoutes = require("./routes/card");
const activityRoutes = require("./routes/activity");


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/cards", cardRoutes);
app.use("/api/activities", activityRoutes);

// Serve React frontend (build folder from the client)
const CLIENT_BUILD_PATH = path.join(__dirname, "../Client/build");
app.use(express.static(CLIENT_BUILD_PATH));

// Catch-all route to serve the React frontend for unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
});


app.use(errorMiddleware);


app.get("/", (req, res) => {
  res.send("Backend is working!");
});


const PORT = process.env.PORT || 5000;
sequelize
 .authenticate()
 .then(() => {
    console.log("Database connected...");
    return sequelize.sync({ force: false});
 })
 .then(() => {
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((error) => {
    console.error("Unable to connect to the database:", error);
})
