const { Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Checks if the bot is online.",
  /**
    * @param {CommandInteraction} interaction
    * @param {Client} client
    */
  async execute(interaction, client) {
    const Row = new MessageActionRow();
    Row.addComponents(
      new MessageButton()
      .setCustomId("ping")
      .setLabel("🏓 Ping!")
      .setStyle("PRIMARY")
    )

    const Response = new MessageEmbed()
    .setColor("RED")
    .setDescription(`🏓 PONG!`)

    interaction.reply({embeds: [Response], components: [Row], ephemeral: true})
  }
}