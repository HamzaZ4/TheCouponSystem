const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// importing models
const Child = require("./models/child");
const Parent = require("./models/parent");

mongoose.connect("mongodb://localhost:27017/theCouponSystem");
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
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("commonPages/home", { cssFile: "home" });
});

app.get("/parent/:id", async (req, res) => {
  const parent = await Parent.findById(req.params.id).populate("children");
  console.log(parent.name);
  res.render("parent/dashboard", {
    cssFile: "parentDashboard",
    parent,
  });
});

app.listen(3000, () => {
  console.log("serving on port 3000");
});
