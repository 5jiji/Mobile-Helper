const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType } = require("discord-api-types/payloads/v10");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('channel')
    .setDescription("Types of command for channel")
    .addSubcommand(o => o
      .setName('create')
      .setDescription("Create a text channel")
      .addStringOption(o => o
        .setName('name')
        .setDescription('The name of the new channel')
        .setRequired(true))
      .addStringOption(o => o
        .setName('type')
        .setDescription("The type of the channel")
        .setRequired(true)
        .addChoices(
          { name: "Text", value: 'GUILD_TEXT' },
          { name: "Voice", value: 'GUILD_VOICE' },
          { name: "News", value: 'GUILD_NEWS' },
          { name: "Stage", value: 'GUILD_STAGE_VOICE' },
          { name: "Forum", value: 'GUILD_FORUM' }
        ))
      .addStringOption(o => o
        .setName("place")
        .setDescription("The position where the channel will be")
        .setRequired(true))
      .addStringOption(o => o
        .setName("reason")
        .setDescription("The reason to creating this channel"))),
  async execute(interaction) {
    const sc = interaction.options.getSubcommand();
    let guild = interaction.guild;
    await guild.fetch();

    if (sc === "create") {
      const name = interaction.options.getString('name');
      const place = interaction.options.getString('place');
      const type = interaction.options.getString("type");
      const reason = interaction.options.getString("reason") || "No reason provided";

      // if (type === "GUILD_FORUM") return interaction.reply("I prefer not creating it...")
      if (type === "GUILD_STAGE" || type === "GUILD_NEWS") {
        let yes = 0
        guild.features.forEach(e => {
          if (e === "COMMUNITY") return yes=1
        });
        if (yes = 0) return interaction.reply("you don't have community enabled, i can't create that type of channel")
      }

      try {
        await guild.channels.create(name, { type: type, position: place, reason: reason });
        interaction.reply(`Channel ${name} created!`);
      }
      catch (err) {
        interaction.reply(`\`${err}\``);
        console.log(err)
      }
    }
    else if (sc === "move") {
      
    }
  }
}
