require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

const port = process.nextTick.PORT || 3000;




// modelo - usuario
const User = require("./models/User");

// Config JSON 
app.use(express.json());






//..............................................................
// rota aberta/ inicio do site
app.get('/', (req, res) => {
  //res.status(200).json({ msg: "Bem vindo A ACADEMIA A3" });
  res.sendFile(__dirname + '/index.html');
})
//..............................................................






// rotas privadas
app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  // conferir se usuario existe
  const user = await User.findById(id, "-password");

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  res.status(200).json({ user });
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
}





//variaveis email, senha
app.post("/auth/register", async (req, res) => {
  const { 
    name, 
    email, 
    password, 
    confirmpassword } = req.body;




  // validações - se caso algo tiver faltando, não vai  funcionar
  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório!" });
  }

  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  if (password != confirmpassword) {
    return res
      .status(422)
      .json({ msg: "A senha e a confirmação precisam ser iguais!" });
  }

  // confere se usuario existe 
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
  }

  // criando a senha
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // criando usuario 
  const user = new User({
    name,
    email,
    password: passwordHash,
  });



  try {
    await user.save();

    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // validando se está com todos os dados necessarios
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  // confere se  possui USUARIO existente
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // confere se  possui senha existente
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    // `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.folvv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    `mongodb+srv://felipenobre:wrEvIrqQZiJWuTcK@cluster0.nfbpl.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectou ao banco!");
    app.listen(port, ()=>{ "RODAR em http://localhost:3000"

    });
  })
  .catch((err) => console.log(err)); 
