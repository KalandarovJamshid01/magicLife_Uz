const mongoose = require("mongoose");
const paymeSchema = new mongoose.Schema({
  payme_id: {
    type: String,
    // required: true,
    // unique: true,
  },
  time: {
    type: String,
    // required: true,
  },
  amount: {
    type: Number,
    // required: true,
  },

  account: {
    type: Number,
  },
  create_time: {
    type: String,
    default: Date.now(),
  },
  perform_time: {
    type: Date,
  },
  cancel_time: {
    type: String,
    dafault: 0,
  },
  order_id: {
    type: Number,
  },
  state: {
    type: Number,
    enum: [1, 2, -1, -2],
  },
  reason: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 10],
  },
  receivers: [
    {
      id: String,
      amount: Number,
    },
  ],
});

const Payme = mongoose.model("paymes", paymeSchema);

module.exports = Payme;
