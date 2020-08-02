require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const getServerInfo = require("./lib/serverinfo");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({
    out: "hello",
  });
});

app.get("/server/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let response = await getServerInfo(id);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

const PORT = process.env.PORT || 3000;
const LOG = process.env.LOG || false;
if (!LOG) console.log = () => null;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
