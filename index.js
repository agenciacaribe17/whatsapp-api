const express = require("express");
const app = express();

app.use(express.json());

app.post("/send", async (req, res) => {
  const { number, message } = req.body;

  try {
    console.log("Enviando para:", number);
    console.log("Mensagem:", message);

    // 👉 depois você coloca seu código real aqui

    res.send("enviado");
  } catch (err) {
    res.status(500).send("erro ao enviar");
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});