const mongoose = require("mongoose");

const AgendaSchema = mongoose.Schema({
  agendaLines: [
    {
      id: String,
      text: String,
      order: String,
      index: String
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("agenda", AgendaSchema);
