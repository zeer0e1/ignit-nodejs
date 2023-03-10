const express = require("express");
const { v4: uuidv4 } = require("uuid");
const costumers = [];

const app = express();

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;
  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "customer not found" });
  }

  request.customer = customer;

  return next();
}

function getBalance(statemet) {
  const balance = statemet.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
}

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

app.get("/statement/date", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request.customer;
  const { date } = request.query;

  const dateFormat = new Date(data + " 00:00");

  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateStrng() === new Date(dateFormat).toDateStrng()
  );

  return response.json(statement);
});

app.put("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { name } = request.body;
  const { costumer } = request;
  costumer.name = name;

  return response.status(201).send();
});

app.get("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer);
});

app.delete("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  costumers.splice(costumers.indexOf(customer), 1);

  return response.status(200).json(costumers).send();
});

app.get("/balance", verifyIfExistsBalance, (request, response) => {
  const { customer } = request;
  const balance = getBalance(customer.statement);
  return response.json({ balance });
});

app.listen(3333);
