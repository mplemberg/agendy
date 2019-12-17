const mongoose = require("mongoose");
const Agenda = require("../models/Agenda");

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const setPublishable = (agendaView, agenda) => {
  if (
    !agenda.publishedVersion ||
    agenda.publishedVersion.savedDate.toUTCString() !==
      agenda.draftVersion.savedDate.toUTCString()
  ) {
    agendaView.isPublishable = true;
  }
};
const buildDraftViewFromModel = agenda => {
  const agendaView = {
    id: agenda.id,
    name: agenda.draftVersion.name,
    agendaLines: agenda.draftVersion.agendaLines,
    savedDate: agenda.draftVersion.savedDate,
    publishedDate: agenda.publishedDate,
    viewCode: agenda.viewCode
  };

  setPublishable(agendaView, agenda);

  return agendaView;
};

const buildPublishedViewFromModel = agenda => {
  const agendaView = {
    id: agenda.id,
    name: agenda.publishedVersion.name,
    agendaLines: agenda.publishedVersion.agendaLines,
    savedDate: agenda.publishedVersion.savedDate,
    publishedDate: agenda.publishedDate
  };

  setPublishable(agendaView, agenda);

  return agendaView;
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
      savedDate: agenda.draftVersion.savedDate
    };
  }

  async getDraft(editCode) {
    const agenda = await Agenda.findOne({ editCode });
    return buildDraftViewFromModel(agenda);
  }

  async updateDraft(id, { name, agendaLines }) {
    const agenda = await Agenda.findByIdAndUpdate(
      id,
      {
        draftVersion: { name, agendaLines, savedDate: Date.now() }
      },
      { new: true }
    );
    return buildDraftViewFromModel(agenda);
  }

  async publish(id) {
    let agenda = await Agenda.findById(id);
    agenda = await Agenda.findByIdAndUpdate(
      id,
      {
        publishedVersion: agenda.draftVersion,
        publishedDate: Date.now(),
        viewCode: agenda.viewCode ? agenda.viewCode : uuidv4()
      },
      { new: true }
    );

    return buildDraftViewFromModel(agenda);
  }

  async getPublished(viewCode) {
    const agenda = await Agenda.findOne({ viewCode });
    if (!agenda) {
      return null;
    }
    return buildPublishedViewFromModel(agenda);
  }
}

module.exports = new AgendaService();
