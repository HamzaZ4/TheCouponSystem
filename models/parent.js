const mongoose = require("mongoose");
const { Schema } = mongoose;

const parentSchema = new Schema({
  parentSexe: {
    type: String,
    enum: ["Mom", "Dad"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId, // array of type object ids
      ref: "Child", // the object ids reference the child Schema type
    },
  ],
});
// telling mongoose i want to make a model out of the schema i just defined
const Parent = mongoose.model("Parent", parentSchema);

module.exports = Parent;
