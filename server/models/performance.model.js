import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const performancesSchema = mongoose.Schema({
  user: ObjectId,
  farmers: [ObjectId],
  farmlands: [ObjectId],
  monitorings: [
    {
      name: {
        type: String,
        enum: {
          values: [
            "disease",
            "pruning",
            "plague",
            "weeding",
            "insecticide",
            "fungicide",
            "harvest",
          ],
          message: "Este tipo de monitoria nao esta contemplado!",
        },
      },
      division: ObjectId,
    },
  ],
});

const Performance = mongoose.model("Performance", performancesSchema);

export default Performance;
