const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { token, clientId, guildId } = require('./config.json');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing guild application (/) commands.');

    if (guildId instanceof Array) {
      guildId.forEach(async guild => {
        await rest.put(
          Routes.applicationGuildCommands(clientId, guild),
          { body: commands },
        );
      })
    }
    else if (!(guildId instanceof Array)) {
      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      )
    }
    console.log('Successfully reloaded guild application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
