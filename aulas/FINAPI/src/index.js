const express = require("express");
const { v4: uuidv4 } = require("uuid");
const costumers = [];

const app = express();

app.use(express.json());

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;

  const costumerAlreadyExists = costumers.some(
    (costumer) => costumer.cpf === cpf
  );

  if (costumerAlreadyExists) {
    return res.status(400).json({ error: "Costume already exists!" });
  }
  costumers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return res.status(201).send();
});

app.listen(3333);
