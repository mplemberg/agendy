const mongoose = require("mongoose");

const AgendaSchema = mongoose.Schema({
  versions: [
    {
      versionType: String,
      name: String,
      agendaLines: [
        {
          id: String,
          text: String,
          indent: { type: Number, default: 0 }
        }
      ]
    }
  ],
  viewCode: String,
  editCode: String,
  createdDate: {
    type: Date,
    default: Date.now
  },
  savedDate: {
    type: Date,
    default: Date.now
  },
  publishedDate: {
    type: Date
  }
});

module.exports = mongoose.model("agenda", AgendaSchema);
