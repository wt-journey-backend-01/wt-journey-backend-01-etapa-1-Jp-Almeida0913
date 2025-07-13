const express = require(`express`);
const path = require(`path`);
const fs = require(`fs`)

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended : true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `views`, `index.html`))
});

app.get('/sugestao', (req, res) => {
    const {nome, ingredientes} = req.query;

    res.send(`
        <h1>Obrigado pela sugestão, ${nome}</h1>
        <p>Ingredientes sugeridos: ${ingredientes}</p>
        <a href = "/"> Voltar ao início</a>
        `);
});

app.get('/contato', (req, res) => {
    try{
        res.sendFile(path.join(__dirname, `views`, `contato.html` ))
    }catch{
        res.status(404).sendFile(path.join(__dirname, `public`, `404.html`))
    }
});

app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    res.send(`
    <h1>Mensagem recebida!</h1>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Assunto:</strong> ${assunto}</p>
    <p><strong>Mensagem:</strong> ${mensagem}</p>
    <a href="/">Voltar</a>
  `);
});

app.get('/api/lanches', async(req, res) => {
    try {
        const filePath = path.join(__dirname, `public`, `data`, `lanches.json`);
        const data = await fs.promises.readFile(filePath, `utf8`);
        let lanches = JSON.parse(data);
        const isValid = lanches.every(lanche => 
            lanche &&
            typeof lanche.id == 'number' &&
            typeof lanche.nome == 'string' &&
            typeof lanche.ingredientes == 'string' && 
            lanche.nome.trim() !== '' &&
            lanche.ingredientes.trim()!== '' &&
            lanche.id > 0  
        );
        if (!isValid){
            throw new Error('Erro na estrutura.')
        }
         
        res.setHeader('Content-Type', 'application/json');
        res.json(lanches);

    } catch (erro){
        res.status(500).json({erro: `Erro ao carregar o cardapio.`});
    }
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, `public`, `404.html`))
})

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});


