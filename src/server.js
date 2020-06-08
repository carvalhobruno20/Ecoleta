const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta publica
server.use(express.static("public"))

//Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

//Utilizando Template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminho para minha aplicação
//pagina inicial
//req: Requisição
//res: Resposta
server.get("/", function(req, res) {
    res.render("index.html", { title: "Um Título"})
})

server.get("/create-point", function(req, res) {

    //req.query: Query Strings da nossa url
    //console.log(req.query)
    
    res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body: O corpo do nosso formulario
    //console.log(req.body)

    //Inserir dados no banco de dados
    //2 Inserir dados na Tabela
    const query = `
        INSERT INTO places (
            image,
            nome,
            endereco,
            numero,
            state,
            cidade,
            itens
        ) VALUES (
            ?,?,?,?,?,?,?
        );
    `

    const values = [
        req.body.image,
        req.body.nome,
        req.body.endereco,
        req.body.numero,
        req.body.state,
        req.body.cidade,
        req.body.itens
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com Sucesso!")
        console.log(this)

        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)
  
})


server.get("/search", function(req, res) {

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
       return res.render("search-results.html", { total: 0})
    }

    //pegar os dados do Banco de dados
    db.all(`SELECT * FROM places WHERE cidade LIKE '%${search}%'`, function(err, rows){
        if(err){
          return console.log(err)
    }
      const total = rows.length  
      console.log("Aqui estão seus Registros: ")
      console.log(rows)
      //Mostrar a pagina html copm os dados do banco de dados
      return res.render("search-results.html", { places: rows, total: total})
    })

    
})

//ligar o servidor
server.listen(3000)