const express = require("express");

const app = express();

app.get("/", (req, resp) => {
  return resp.json({ message: "Hello World Ignite Node js!" });
});

app.listen(3333);
