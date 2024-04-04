import fastify from "fastify";

const app = fastify();

// Métodos HTTP: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, ...

// Corpo da requisição (Request Body) → Utilizado em requisições POST e PUT
// Parametros da busca (Search Params / Query Params) → Enviados pela URL, geralmente usados para filtragem de dados com método GET. http://localhost:333/users?name=nathan
// Parametros de rota (Route Params)   → Identificação de recursos e são obrigatórios para que a rota aconteça DELETE http://localhost:333/users/5
// Cabeçalhos (Headers) → Contexto da requisição

// Driver nativo(Construído a mão) / Query Builders / ORMs

//Object Relational Mapping (Hibernate / Docktrine / ActiveRecord) -> Ferramenta que automatiza varios processos do banco de dados ao mesmo tempo

app.get('/', () => {
    return 'Hello World!'
})

app.listen({ port: 3333}).then(() => { //.then() -> Acontece quando der certo a promisse
    console.log("HTTP server running on http://localhost:3333")
})