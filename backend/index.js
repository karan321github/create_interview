const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const connectDb = require("./config/db");


app.use(cors());
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));

connectDb();

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

//Singh8750
