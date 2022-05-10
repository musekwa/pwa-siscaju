import mongoose from "mongoose";

var Schema = mongoose.Schema;

const farmersSchema = mongoose.Schema(
  {
    fullname: { type: String, trim: true, required: true },
    sex: {
      type: String,
      enum: {
        values: ["F", "M"],
        message: "{VALUE} não é um genero autorizado",
      },
    },
    birthDate: {
      type: Date,
      required: true,
    },
    birthPlace: {
      province: {
        type: String,
        trim: true,
      },
      district: {
        type: String,
        trim: true,
        // required: [true, "Obrigatorio indicar o distrito de nascimento"],
      },
      territory: { type: String, trim: true },
      village: { type: String, trim: true },
    },
    address: {
      province: {
        type: String,
        enum: {
          values: ["Nampula"],
          message: "Por enquanto, {VALUE} não é uma provincia autorizada!",
        },
      },
      district: {
        type: String,
        enum: {
          values: [
            "Angoche",
            "Eráti",
            "Ilha de Moçambique",
            "Lalaua",
            "Larde",
            "Liúpo",
            "Malema",
            "Meconta",
            "Mecubúri",
            "Memba",
            "Mogincual",
            "Mogovolas",
            "Moma",
            "Monapo",
            "Mossuril",
            "Muecate",
            "Murrupula",
            "Nacala-a-Velha",
            "Nacala-Porto",
            "Nacarôa",
            "Nampula",
            "Rapale",
            "Ribáuè",
          ],
          message: "Por enquanto, {VALUE} não é uma distrito autorizado!",
        },
      },
      territory: { type: String, trim: true },
      village: { type: String, trim: true },
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /\d{9}/.test(v);
        },
        message: (props) =>
          `${props.value} não é um numero de telefone valido!`,
      },
    },
    image: String,
    farmlands: [
      {
        type: Schema.Types.ObjectId,
        ref: "Farmland",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

// pre hooks

farmersSchema.pre("save", function (next) {
  if (true) {
    // do some stuffs
    next();
  } else {
    // throw error
    next(new Error("message error"));
  }
});

// // case-titling and sanitizing the name
farmersSchema.pre("save", function (next) {
  let names = this.fullname.split(" ");
  if (names.length > 1) {
    let filteredName = names.filter((name) => name !== "");
    let normalizedName = filteredName.map(
      (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    );
    this.fullname = normalizedName.join(" ");
  }
  next();
});

// validating the fullname
farmersSchema.path("fullname").validate(function (value) {
  return value.split(" ").length > 1;
}, "Nome completo e obrigatorio");

// post hooks

// instance method
// 1. set farmer category based on the # of cashew trees
// that they own (familiar; comercial?)
farmersSchema.method("setFarmerCategory", function () {});

// schema methods
// reject farmer registration if an only if another farmer of
// the same name, birth date, and address already exists
farmersSchema.methods.rejectDuplicates = function () {};

const Farmer = mongoose.model("Farmer", farmersSchema);

export default Farmer;

// enxertia e semente policlonal
