import mongoose from "mongoose";

var Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const farmlandsSchema = mongoose.Schema(
  {
    label: { type: String, lowercase: true },
    area: {
      declared: Number,
      actual: Number,
    },
    geocoordinates: {
      latitude: Number,
      longitude: Number,
    },
    divisions: [ObjectId],
    farmer: {
      type: Schema.Types.ObjectId,
      ref: "Farmer",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

const Farmland = mongoose.model("Farmland", farmlandsSchema);

export default Farmland;
