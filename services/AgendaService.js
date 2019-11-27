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
      draftVersion: { name, agendaLines },
      editCode: uuidv4()
    });
    const agenda = await newAgenda.save();

    return {
      isPublishable: true,
      id: agenda.id,
      name: agenda.draftVersion.name,
      agendaLines: agenda.draftVersion.agendaLines,
      editCode: agenda.editCode,
      savedDate: agenda.savedDate
    };
  }

  async getDraft(editCode) {
    const agenda = await Agenda.findOne({ editCode });

    const agendaView = {
      id: agenda.id,
      name: agenda.draftVersion.name,
      agendaLines: agenda.draftVersion.agendaLines,
      editCode: agenda.editCode,
      savedDate: agenda.savedDate,
      publishedDate: agenda.publishedDate
    };

    if (!agenda.publishedDate || agenda.savedDate !== agenda.publishedDate) {
      agendaView.isPublishable = true;
    }
    return agendaView;
  }

  async updateDraft(id, draft) {}
}

module.exports = new AgendaService();
