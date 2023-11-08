import mongoose from "mongoose";

// - Title.
// - vehicle Types.
// - Address.
// - mobile.
// - website url.
// - logo img.
// - banner img.

const vehicleSchema = new mongoose.Schema({
  title: String,
  vehicleType: {
    type: Number,
    enum: [1, 2, 3],
  },
  address: String,
  mobile: Number,
  websiteURL: String,
  logo: String,
  banner: String,
});

const Vehicle = mongoose.model("vehicle", vehicleSchema);

export default Vehicle;
