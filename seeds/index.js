const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Parent = require("../models/parent");
const Child = require("../models/child");
const names = require("./names");

mongoose.connect("mongodb://localhost:27017/theCouponSystem");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Database connected");
});

// creating the seedDB function that will take care of seeding the database
const seedDB = async () => {
  await Parent.deleteMany({});
  await Child.deleteMany({});

  //create some random parent to assign to every child
  const newParent = new Parent({
    name: "Parent 1",
    parentSexe: "Mom",
    children: [],
  });
  await newParent.save();

  // In objects, for in will loops through properties inside of an object, For of will loop through the elements of an iterable
  for (const fullName of names) {
    const newChild = new Child({
      name: `${fullName.firstName} ${fullName.lastName}`,
      parents: [newParent],
      dateOfBirth: new Date(2004, 4, 4),
    });

    await newChild.save();
    newParent.children.push(newChild);
    await newParent.save();
  }
};

//calling the seeding method,m then closing the connection to mongo once the seeding is completed
seedDB().then(() => mongoose.connection.close());
