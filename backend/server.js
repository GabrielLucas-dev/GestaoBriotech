import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import auth from './auth.js'

const app = express();
app.use(express.json());
app.use(cors()); //comunicação com backend
dotenv.config();

app.use('/atividades', auth)
app.use('/atividades_concluidas', auth)

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
            const usuario = data[0]
            
            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email
                },
                process.env.JWT_SECRET,
                {expiresIn: "1h"}
            );
            return res.json({
                sucess: true,
                token
            });

        } else{
            return res.status(401).json({
                sucess: false,
                message: 'email ou senha inválidos!' 
            })
        };
    });
});

app.get('/atividades', (req, res) => {
    const sql = `
        SELECT a.id_atividade, a.titulo, a.descricao, a.prazo, a.esta_concluida, a.concluida_em, a.criada_em,
        u.nome as criada_por
        FROM atividades a
        JOIN usuarios u ON u.id = a.criada_por
    `;
    db.query(sql, (error, data) => {
        if(error) return res.status(500).json(error)
        return res.json(data);    
    });
});

app.post('/atividades', (req, res) => {
    const sql = "INSERT INTO atividades (titulo, descricao, prazo, criada_por) values (?, ?, ?, ?)";
    const {titulo, descricao, prazo} = req.body;
    const usuarioId = req.usuario.id;      //vem do JWT agora

    db.query(sql, [titulo, descricao, prazo, usuarioId], (error, data) => {
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

app.get('/atividades_concluidas', (req, res) => {
    const sql = "SELECT * FROM atividades WHERE esta_concluida = true"
    db.query(sql, (error, data) => {
        if(error) return res.status(500).json(error)
        return res.status(201).json(data)
    })
})

const port = 3001;
app.listen(port, console.log(`rodando na porta ${port}`));
