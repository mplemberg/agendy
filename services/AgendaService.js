const mongoose = require("mongoose");
const Agenda = require("../models/Agenda");

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

class AgendaService {
  async createDraft({ name, agendaLines }) {
    const newAgenda = new Agenda({
      editCode: uuidv4(),
      versions: [
        {
          versionType: "draft",
          name,
          agendaLines
        }
      ]
    });
    const agenda = await newAgenda.save();

    return {
      name: agenda.versions[0].name,
      agendaLines: agenda.versions[0].agendaLines,
      editCode: agenda.editCode,
      viewCode: agenda.viewCode,
      isPublishable: true,
      savedDate: agenda.savedDate
    };
  }
}

module.exports = new AgendaService();
