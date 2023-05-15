const annonce = require("./components/annonce");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

annonce(client);

// Gestion des erreurs
client.on("error", console.error);

// Connexion au serveur Discord
client.login(process.env.DISCORD_TOKEN);
