const express = require("express");
const router = express.Router();
const Agenda = require("../models/Agenda");
const AgendaService = require("../services/AgendaService");
router.get("/", async (req, res) => {
  // res.json({ msg: "get all gendas" });
  try {
    const agendas = await Agenda.find().sort();
    res.json(agendas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:viewCode", async (req, res) => {
  try {
    const agenda = await AgendaService.getPublished(req.params.viewCode);
    if (!agenda) return res.status(404).json({ msg: "Agenda not found" });
    res.json(agenda);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/edit/:editCode", async (req, res) => {
  try {
    const agenda = await AgendaService.getDraft(req.params.editCode);
    if (!agenda) return res.status(404).json({ msg: "Agenda not found" });
    res.json(agenda);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/edit/:id", async (req, res) => {
  const agendaParams = req.body;
  try {
    const agenda = await AgendaService.updateDraft(req.params.id, agendaParams);
    if (!agenda) return res.status(404).json({ msg: "Agenda not found" });
    res.json(agenda);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/publish/:id", async (req, res) => {
  try {
    const agenda = await AgendaService.publish(req.params.id);
    if (!agenda) return res.status(404).json({ msg: "Agenda not found" });
    res.json(agenda);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const agendaParams = req.body;

  try {
    const agenda = await AgendaService.createDraft(agendaParams);
    res.json(agenda);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let agenda = await Agenda.findById(req.params.id);

    if (!agenda) return res.status(404).json({ msg: "Agenda not found" });

    await Agenda.findByIdAndRemove(req.params.id);

    res.json({ msg: "Agenda removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
