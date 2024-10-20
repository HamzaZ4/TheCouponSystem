const mongoose = require("mongoose");
const { Schema } = mongoose;

const childSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  parents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
    },
  ],
  dateOfBirth: {
    type: Date, // This defines the dateOfBirth as a Date type
    required: true,
  },
});

const Child = mongoose.model("Child", childSchema);

module.exports = Child;
