const express = require(`express`);
const path = require(`path`);
const fs = require(`fs`)

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `views`, `index.html`))
});

app.get('/sugestao', (req, res) => {
    res.sendFile(path.join(__dirname, `views`, `sugestao.html` ))
})

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, `views`, `contato.html` ))
})

app.post('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, `views`, `contato.html` ))
})

app.get('/api/lanches', (req, res) => {
    res.sendFile(path.join(__dirname, `views`, `contato.html` ))
})

app.get('/')

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});


