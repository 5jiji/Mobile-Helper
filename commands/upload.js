const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("upload")
    .setDescription("Upload files")
    .addSubcommand(sc => sc
      .setName("emojis")
      .setDescription("Upload an emoji")
      .addAttachmentOption(o => o
        .setName("file")
        .setDescription("The emoji you want to upload")
        .setRequired(true))
      .addStringOption(o => o
        .setName("name")
        .setDescription("The name of the emoji")
        .setRequired(true))
      ),
  async execute(interaction) {
    const sc = interaction.options.getSubcommand()
    const attachment = interaction.options.getAttachment("file")
    const guild = interaction.guild
    await guild.fetch()

    if (sc === "emojis") {
      const nameEmoji = interaction.options.getString("name")

      //try {
        guild.emojis.create({ attachment: attachment.url, name: nameEmoji})
        interaction.reply(`${nameEmoji} created.`)
      //}
      //catch {
        //interaction.reply({ ephemeral: true, text: "I'm sorry Dave, but i'm affraid i can't do that"})
      //}
    }
  }
}