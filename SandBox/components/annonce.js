function annonce(client) {
  // Configuration du préfixe de commande
  const prefix = "!";
  const annonceChannelId = "1107468101878022154";

  // Événement de connexion
  client.on("ready", () => {
    console.log(`Connecté en tant que ${client.user.tag}!`);
  });

  // Événement de message
  client.on("messageCreate", (message) => {
    // Vérifie si le message commence par le préfixe et que l'auteur n'est pas un bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Sépare le nom de la commande et les arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Vérifie si la commande est 'annonce'
    if (commandName === "annonce") {
      // Vérifie si l'utilisateur a la permission de gérer les messages
      if (!message.member.permissions.has("MANAGE_MESSAGES")) {
        console.log(
          `L'utilisateur ${message.author.tag} n'a pas la permission de gérer les messages.`
        );
        return;
      }

      // Vérifie si des arguments ont été fournis
      if (!args.length) {
        console.log(`La commande 'annonce' a été appelée sans argument.`);
        return message.reply("Vous devez fournir un message d'annonce !");
      }

      // Récupère le message d'annonce et l'envoie dans le canal actuel
      const announcement = args.join(" ");
      client.channels.cache
        .get(annonceChannelId)
        .send(`${message.author} ${announcement}`);
    }
  });
}

module.exports = annonce;
