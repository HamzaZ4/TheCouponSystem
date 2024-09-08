const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

mongoose.connect("mongodb://localhost:27017/yelpy-camper");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());
app.engine("ejs", ejsMate);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { bodyClass: "home-page-body" });
});

app.get("/parent/dashboard", (req, res) => {
  res.render("parent/dashboard", { bodyClass: "dashboard-page-body" });
});



app.listen(3000, () => {
  console.log("serving on port 3000");
});
