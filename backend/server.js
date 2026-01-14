import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors()); //comunicação com backend
dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "gestaobriotech_db",
});

db.connect((error) => {
  if (error) return console.log("Erro ao se conectar com o BD");
  return console.log("Conexão com o BD feita com sucesso!");
});

// db.query("SELECT DATABASE()", (err, result) => {
//     if(err) return console.log(err)
//     return console.log("BANCO: ", result)
// })
// db.query("SHOW TABLES", (err, tables) => {
//     console.log(tables);
// });

// db.query("SELECT COUNT(*) AS total FROM usuarios", (err, result) => {
//     console.log("Total de usuários:", result[0].total);
// });

// app.post("/login", (req, res) => {
//   const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
//   db.query(sql, [req.body.email, req.body.senha], (error, data) => {
//     if (error) return res.status(500).json("login falhou!");
//     if (data.length > 0) {
//       return res.status(201).json("Login feito com sucesso");
//     } else {
//       return res.status(401).json("Usuário ou senha inválidos!");
//     }
//   });
// });

app.get("/login", (req, res) => {
  const sql = "SELECT * FROM usuarios";
  db.query(sql, (error, data) => {
    if(error) return res.status(500).json(error);
    return res.json(data);
  });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?"
    const { email, senha } = req.body
    db.query(sql, [email, senha], (error, data) => {
        if(error) return res.status(500).json(error)

        if(data.length > 0) {
            res.json({
                sucess: true,
                usuario: data[0]
            }) 
        } else{
            return res.status(402).json('erro na autenticação', { sucess: false })
        }
    })
})

app.get('/atividades', (req, res) => {
    const sql = "SELECT * FROM atividades";
    db.query(sql, (error, data) => {
        if(error) return console.log(error);
        return res.json(data);    
    });
});

app.post('/atividades', (req, res) => {
    const sql = "INSERT INTO atividades (titulo, descricao, prazo, criada_por) values (?, ?, ?, 2)";
    const {titulo, descricao, prazo} = req.body;
    db.query(sql, [titulo, descricao, prazo], (error, data) => {
        if(error) return console.log(error);
        return res.json(data);
    });
});

app.delete('/atividades/:id_atividade', (req, res) => {
    const sql = "DELETE FROM atividades WHERE id_atividade = ?"
    const id = req.params.id_atividade

    db.query(sql, [id], (error, data) => {
        if(error) return res.status(400).json(error) 
        return res.status(200).json(data, "removido com sucesso!")
    })
})

// FUNCIONOU :)
app.put('/atividades/:id_atividade', (req, res) => {
    const sql = "UPDATE atividades SET esta_concluida = true WHERE id_atividade = ?"
    const id = req.params.id_atividade

    db.query(sql, [id], (error, data) => {
        if(error) return console.log("Erro ao atualizar atividade", error)
        return res.status(200).json(data)
    })
})

const port = 3001;
app.listen(port, console.log(`rodando na porta ${port}`));
