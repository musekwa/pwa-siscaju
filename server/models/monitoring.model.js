import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const monitoringsSchema = mongoose.Schema(
  {
    diseases: [
      {
        name: { type: String, trim: true },
        trees: {
          higherSeverity: Number,
          highSeverity: Number,
          averageSeverity: Number,
          lowSeverity: Number,
          noSeverity: Number,
        },
        controlledAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    plagues: [
      {
        name: { type: String, trim: true },
        trees: {
          higherSeverity: Number,
          highSeverity: Number,
          averageSeverity: Number,
          lowSeverity: Number,
          noSeverity: Number,
        },
        controlledAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    weeding: {
      cleanTrees: Number,
      weededAt: {
        type: Date,
      },
    },
    pruning: [
      {
        pruningType: {
          type: String,
          enum: {
            values: [
              "Poda de formação",
              "Poda de sanitação",
              "Poda de manutenção",
              "Poda de rejuvenescimento",
            ],
            message: ["Este tipo de poda não é recomendado"],
          },
          prunedTrees: Number,
          prunedAt: { type: Date },
        },
      },
    ],
    pesticides: {
      insecticides: [
        // plagues
        {
          name: { type: String, trim: true },
          treatedTrees: Number,
          appliedAt: Date,
        },
      ],
      fungicides: [
        // diseases
        {
          name: { type: String, trim: true },
          treatedTrees: Number,
          appliedAt: Date,
        },
      ],
    },
    harvest: [
      {
        productiveTrees: Number,
        appleQuantity: Number,
        nutQuantity: Number,
        harvestedAt: Date,
      },
    ],
    farmDivision: {
      type: ObjectId,
      required: true,
      ref: "FarmDivision",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Monitoring = mongoose.model("Monitoring", monitoringsSchema);

export default Monitoring;
