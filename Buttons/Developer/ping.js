const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    id: "ping",
    async execute(interaction) {
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