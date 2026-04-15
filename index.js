const express = require("express");
const makeWASocket = require("@whiskeysockets/baileys").default;
const { useMultiFileAuthState } = require("@whiskeysockets/baileys");

const app = express();
app.use(express.json());

let sock;

async function startWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");

  sock = makeWASocket({
    auth: state
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, qr } = update;

    if (qr) {
      console.log("📲 Escaneie o QR Code:");
      console.log(qr);
    }

    if (connection === "open") {
      console.log("✅ WhatsApp conectado!");
    }
  });
}

startWhatsApp();

app.post("/send", async (req, res) => {
  const { number, message } = req.body;

  try {
    await sock.sendMessage(number + "@s.whatsapp.net", {
      text: message
    });

    res.send("enviado");
  } catch (err) {
    console.error(err);
    res.status(500).send("erro ao enviar");
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando");
});
