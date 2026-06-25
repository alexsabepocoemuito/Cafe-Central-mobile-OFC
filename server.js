// CARREGA AS VARIÁVEIS DE AMBIENTE
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");
const pool = require("./db.js");

const app = express();

const listOrigins = [
  "http://localhost:8081",
  "http://localhost:8082",
  "http://localhost:5501",
  "http://127.0.0.1:5501",
  "https://alexsabepocoemuito.github.io",
  "https://cafecentral-mobile.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || listOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origem bloqueada pelo CORS: " + origin));
      }
    },
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

// TESTE DO BANCO
app.get("/teste-banco", async (req, res) => {
  try {
    const [resultado] = await pool.execute("SELECT 1 AS teste");

    res.json({
      mensagem: "Banco conectado com sucesso!",
      resultado
    });
  } catch (erro) {
    console.log("Erro ao testar banco:", erro);

    res.status(500).json({
      erro: "Erro ao conectar no banco",
      detalhe: erro.message
    });
  }
});

// CADASTRO
app.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    console.log("Dados recebidos no cadastro:", req.body);

    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: "Preencha todos os campos!"
      });
    }

    const [usuariosExistentes] = await pool.execute(
      "SELECT id FROM tb_usuarios WHERE email = ?",
      [email]
    );

    if (usuariosExistentes.length > 0) {
      return res.status(409).json({
        erro: "E-mail já cadastrado!"
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await pool.execute(
      "INSERT INTO tb_usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senhaHash]
    );

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!"
    });

  } catch (erro) {
    console.log("Erro no cadastro:", erro);

    return res.status(500).json({
      erro: "Erro ao cadastrar usuário!",
      detalhe: erro.message
    });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    console.log("Dados recebidos no login:", req.body);

    if (!email || !senha) {
      return res.status(400).json({
        erro: "Preencha todos os campos!"
      });
    }

    const [resultado] = await pool.execute(
      "SELECT * FROM tb_usuarios WHERE email = ?",
      [email]
    );

    if (resultado.length === 0) {
      return res.status(401).json({
        erro: "Usuário ou senha inválidos!"
      });
    }

    const usuario = resultado[0];

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        erro: "Senha inválida!"
      });
    }

    req.session.usuario = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    };

    return res.json({
      mensagem: "Login realizado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (erro) {
    console.log("Erro no login:", erro);

    return res.status(500).json({
      erro: "Erro ao fazer login!",
      detalhe: erro.message
    });
  }
});

// CONTATO
app.post("/contato", async (req, res) => {
  try {
    const { nome_mensagem, email_mensagem, mensagem_mensagem } = req.body;

    console.log("Dados recebidos no contato:", req.body);

    if (!nome_mensagem || !email_mensagem || !mensagem_mensagem) {
      return res.status(400).json({
        erro: "Preencha todos os campos!"
      });
    }

    await pool.execute(
      `INSERT INTO tb_mensagem 
      (nome_mensagem, email_mensagem, mensagem_mensagem)
      VALUES (?, ?, ?)`,
      [nome_mensagem, email_mensagem, mensagem_mensagem]
    );

    return res.json({
      mensagem: "Mensagem enviada com sucesso!"
    });

  } catch (erro) {
    console.log("Erro no contato:", erro);

    return res.status(500).json({
      erro: "Erro ao enviar mensagem!",
      detalhe: erro.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});