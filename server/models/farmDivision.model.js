import mongoose from "mongoose";
var Schema = mongoose.Schema;

const farmDivisionsSchema = mongoose.Schema(
  {
    trees: Number,
    sowingYear: Number,
    spacing: {
      x: Number,
      y: Number,
      category: {
        type: String,
        enum: {
          values: ["regular", "irregular"],
          message: "{VALUE} nao e uma categoria permitida",
        },
      },
    },
    plantingTechniques: [String],
    seedlingTypes: [String],
    interCrops: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
    farmland: {
      type: Schema.Types.ObjectId,
      ref: "Farmland"
    }
  },
  { timestamps: true }
);

const FarmDivision = mongoose.model("FarmDivision", farmDivisionsSchema);

export default FarmDivision;
