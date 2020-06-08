//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que ira fazer operações no bancos de dados
const db = new sqlite3.Database("./src/database/database.db") 

module.exports = db
//utilizar o objeto de banco de dados, para nossas operações
db.serialize(function(){
    //Com comandos SQL:

    //1 Criar uma tabela 
    /*db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            nome TEXT,
            endereco TEXT,
            numero TEXT,
            state TEXT,
            cidade TEXT,
            itens TEXT
        );
    `)

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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "N° 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com Sucesso!")
        console.log(this)
    }

    db.run(query, values, afterInsertData)

    //3 Consultar dados da tabela
    db.all(`SELECT nome FROM places`, function(err, rows){
        if(err){
          return console.log(err)
    }

      console.log("Aqui estão seus Registros: ")
      console.log(rows)
    })


    //4 Deletar dado na tabela
    db.run(`DELETE FROM places WHERE id = ?`, [4], function(err){
          if(err){
              return console.log(err)
      }

      console.log("Registro Deletado")
    })*/

    
})