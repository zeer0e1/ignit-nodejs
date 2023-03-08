// CommonJS => require
// novo padrao  ESmodules = import;export

// Http metodes:
// GET
// POST
// PUT
// PATCH
// DELETE

/**
 * GET = Buscar informações no back-end
 * POST = Criar algo no back-end
 * PUT = Editar ou atualizar algo no back-end
 * PATCH = Atualizar uma informação única ou especifica no back-end
 * DELETE = Deletar algo no back-end
 */
import http from "node:http";

// utilizar o node: para diferenciar os modules padrões do node de modules exteriores
const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return res.end("Listagem de usuários");
  }
  if (method === "POST" && url === "/users") {
    return res.end("Criação de usuários");
  }

  return res.end("Heelo world");
});

server.listen(3333);
