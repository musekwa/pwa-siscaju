import mongoose from "mongoose";
import validator from "validator";

var Schema = mongoose.Schema;

var usersSchema = new Schema(
  {
    authId: String,
    fullname: {
      type: String,
      trim: true,
      required: [true, "Deve fornecer o seu nome."],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "O endereço email é obrigatorio."],
      unique: [true, "Este endereço email {VALUE} já existe."],
      validate: [validator.isEmail, "O endereço email é invalido."],
    },
    hashedPassword: {
      type: String,
      required: [true, "Deve fornecer o seu password."],
    },
    salt: String,
    image: String,

    role: {
      type: String,
      enum: {
        values: ["Extensionista", "Gestor", "Produtor"],
        message: "{VALUE} não é um perfil autorizado",
      },
      required: true,
    },
    sex: {
      type: String,
      enum: {
        values: ["F", "M"],
        message: "{VALUE} não é um genero autorizado",
      },
    },
    birthDate: Date,
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
        trim: true,
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

// // case-titling and sanitizing the name 
usersSchema.pre("save", function (next) {
  let names = this.fullname.split(" ");
  if (names.length > 1) {
    let filteredName = names.filter((name) => (name !== ""));
    let normalizedName = filteredName.map(name=>name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
    this.fullname = normalizedName.join(" ");
  }
  next();
});

// validating the fullname
usersSchema.path("fullname").validate(function (value) {
  return value.split(" ").length > 1;
}, "Nome completo e obrigatorio");

const User = mongoose.model("User", usersSchema);

export default User;
