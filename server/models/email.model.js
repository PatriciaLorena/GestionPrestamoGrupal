const mongoose = require("mongoose");
const EmailSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: [true, "el remitente es requerido"],
    },
    to: {
      type: String,
      required: [true, "el destinatario es requerido"],
    },

    subject: {
      type: String,
      required: [true, "el asunto es requerido"],
    },
    text: {
      type: String,
      required: [true, "el texto es requerido"],
    },
  },
  { timestamps: true }
);
module.exports.EmailModel = mongoose.model("Email", EmailSchema);
