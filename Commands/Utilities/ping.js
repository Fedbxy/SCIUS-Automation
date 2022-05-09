const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Checks if the bot is online.",
  /**
    * @param {CommandInteraction} interaction
    * @param {Client} client
    */
  async execute(interaction, client) {
    const Response = new MessageEmbed()
    .setColor("RED")
    .setDescription(`🏓 PONG!`)

    interaction.reply({embeds: [Response]})
  }
}