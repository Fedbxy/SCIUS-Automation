const { Client, MessageEmbed } = require("discord.js");

require("../../Events/Client/ready");

module.exports = {
  name: "status",
  description: "Shows the status of the connection of the client.",
  /**
    * @param {CommandInteraction} interaction
    * @param {Client} client
    */
  async execute(interaction, client) {
    let Color;
    let Latency = client.ws.ping;
    
    if (Latency < 300){
      Color = 'GREEN'
    } else if (Latency >= 300 & Latency < 1000){
      Color = 'ORANGE'
    } else {
      Color = 'RED'
    };
    
    const Response = new MessageEmbed()
    .setColor(Color)
    .setDescription(`**Client**: \`🟢 ONLINE\` (\`${Latency}ms\`)\n**Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R> (<t:${parseInt(client.readyTimestamp / 1000)}:f>)`)

    interaction.reply({embeds: [Response]})
  }
}