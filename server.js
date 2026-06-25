// CARREGA AS VARIÁVEIS DE AMBIENTE ANTES DE QUALQUER COISA
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");
const pool = require("./db.js");

const app = express();

const listOrigins = [
  "http://localhost:8081",
  "http://localhost:5501",
  "http://127.0.0.1:5501",
  "https://FireDW.github.io"
];

app.use(
  cors({
    origin: listOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
  secret: process.env.SESSION_SECRET || "segredo_temporario",
  resave: false,
  saveUninitialized: false,
  name: "cafecentral.sid",
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  sessionConfig.cookie.sameSite = "none";
  sessionConfig.cookie.secure = true;
} else {
  sessionConfig.cookie.sameSite = "lax";
  sessionConfig.cookie.secure = false;
}

app.use(session(sessionConfig));

app.get("/", (req, res) => {
  res.send("API CafeCentral Mobile funcionando");
});

// CADASTRO
app.post("/cadastro", async (req, res) => {
  try {
    const { nome_usuario, email_usuario, senha_usuario } = req.body;

    console.log(req.body);

    if (!nome_usuario || !email_usuario || !senha_usuario) {
      return res.status(400).json({ erro: "Preencha todos os campos!" });
    }

    const [rows] = await pool.execute(
      "SELECT id FROM tb_usuarios WHERE email = ?",
      [email_usuario]
    );

    if (rows.length > 0) {
      return res.status(409).json({ erro: "E-mail já cadastrado!" });
    }

    const senhaHash = await bcrypt.hash(senha_usuario, 10);

    const sql = `
      INSERT INTO tb_usuarios (nome, email, senha)
      VALUES (?, ?, ?)
    `;

    await pool.execute(sql, [nome_usuario, email_usuario, senhaHash]);

    res.json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (erro) {
    console.log("Erro no cadastro:", erro);
    res.status(500).json({ erro: "Erro ao cadastrar usuário!" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email_usuario, senha_usuario } = req.body;

    if (!email_usuario || !senha_usuario) {
      return res.status(400).json({ erro: "Preencha todos os campos!" });
    }

    const sql = `
      SELECT * FROM tb_usuarios
      WHERE email = ?
    `;

    const [resultado] = await pool.execute(sql, [email_usuario]);

    if (resultado.length === 0) {
      return res.status(401).json({ erro: "Usuário ou senha inválidos!" });
    }

    const usuario = resultado[0];

    const senhaCorreta = await bcrypt.compare(senha_usuario, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Senha inválida!" });
    }

    req.session.usuario = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    };

    res.json({
      mensagem: "Login realizado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (erro) {
    console.log("Erro no login:", erro);
    res.status(500).json({ erro: "Erro ao fazer login!" });
  }
});

// CONTATO
app.post("/contato", async (req, res) => {
  try {
    const { nome_mensagem, email_mensagem, mensagem_mensagem } = req.body;

    if (!nome_mensagem || !email_mensagem || !mensagem_mensagem) {
      return res.status(400).json({ erro: "Preencha todos os campos!" });
    }

    const sql = `
      INSERT INTO tb_mensagem 
      (nome_mensagem, email_mensagem, mensagem_mensagem)
      VALUES (?, ?, ?)
    `;

    await pool.execute(sql, [
      nome_mensagem,
      email_mensagem,
      mensagem_mensagem
    ]);

    res.json({ mensagem: "Mensagem enviada com sucesso!" });
  } catch (erro) {
    console.log("Erro no contato:", erro);
    res.status(500).json({ erro: "Erro ao enviar mensagem!" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});