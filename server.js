const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const app = express();
connectDB();

app.use(express.json({ extended: false }));
app.use("/api/agendas", require("./routes/agendas"));

//Server static assets (React) in product
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  //anything thats not the route above
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
