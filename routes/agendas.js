const express = require("express");
const router = express.Router();
const Agenda = require("../models/Agenda");

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

router.get("/:id", async (req, res) => {
  try {
    let agenda = await Agenda.findById(req.params.id);
    if (!agenda) return res.status(404).json({ msg: "Agenda not found" });
    if (agenda.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    res.json(agenda);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { agendaLines } = req.body;

  try {
    const newAgenda = new Agenda({
      agendaLines
    });

    const agenda = await newAgenda.save();

    res.json(agenda);
  } catch (err) {
    console.error(er.message);
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
