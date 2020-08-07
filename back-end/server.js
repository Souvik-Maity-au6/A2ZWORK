const express = require("express");
const dotenv = require("dotenv");
const path = require("path")
const cors = require("cors");
const userRoutes = require("./routes/user/userRoutes");
dotenv.config();

require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'static'))); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);

app.get("/", (req, res) => {
	return res.send({ message: "Welcome To project testing" });
});

app.listen(PORT, () => {
	console.log("Server is running at port", PORT);
});
