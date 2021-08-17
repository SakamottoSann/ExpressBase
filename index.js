const app = require('express')();
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json());

let clients = [
    { id: 1, nome: 'Gustavo Viegas', telefone: '53999867548' },
    { id: 2, nome: 'Fernado Isquierdo', telefone: '53984575985' },
    { id: 3, nome: 'Angelo Luz', telefone: '53991458756' },
    { id: 4, nome: 'Willian Fonseca', telefone: '53981490055' },
]

app.get('/clients', (req, res) => res.json(clients))


app.get('/clients/:id', (req, res) =>
    res.json(clients.filter(value => value.id == req.params.id)))

app.post('/clients', (req, res) => {
    const client = req.body;
    clients.push(client);
    res.json(client);
})


app.put('/clients/:id', (req, res) => {
    const id = req.params.id;
    const nome = req.body.nome;

    let client = clients.filter(value => value.id == id);

    client[0].nome = nome;

    res.json(client[0]);
})

app.delete('/clients/:id', (req, res) => {
    const id = req.params.id;
    clients = clients.filter(value => value.id != id);
    res.json(clients);
})

app.listen(3000);