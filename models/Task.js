import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  text: String,
  day: String,
  reminder: Boolean,
});

const taskModel = mongoose.model("task", taskSchema);
export default taskModel;
