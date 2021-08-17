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

function log (request, response, next){
    const {url, method} = request;
    console.log(`${method} - ${url} at ${new Date()}`)
    return next();
}
app.use(log)

app.get('/clients', (request, response) => response.status(200).json(clients))


app.get('/clients/:id', (request, response) => {
    const {id} = request.params;
    const client = clients.find(value => value.id == id);
    if(client == undefined){
        response.status(400).json({error: 'Requisição inválida'});
    }else{
        response.status(200).json(client);
    }
})

app.post('/clients', (request, response) =>{
    const client = request.body;
    clients.push(client);
    response.status(201).json(client);
})

app.put('/clients/:id', (request, response) => {
    const id = request.params.id;
    const nome = request.body.nome;

    let client = clients.find(value => value.id == id);
    if(client == undefined){
        response.status(400).send();
    }else{
        client.nome = nome;
        response.status(200).json(client);
    }
})

app.delete('/clients/:id', (request, response) => {
    const {id} = request.params;
    const index = clients.findIndex(value => value.id == id);
    if(index == -1){
        response.status(400).send();
    }else{
        clients.splice(index,1);
        response.status(204).send();
    }

})
app.listen(3000);