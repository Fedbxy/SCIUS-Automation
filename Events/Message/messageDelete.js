const { MessageEmbed, Message } = require("discord.js");
const { execute } = require("./messageUpdate");
const { chatLogsID } = require("./../../Structures/config.json");

module.exports = {
    name: "messageDelete",
    /**
     * @param {Message} message
     */
    async execute(message) {
        if (message.author.bot) return;

        const Log = new MessageEmbed()
        .setColor("RED")
        .setDescription(`A [message](${message.url}) by ${message.author} was **deleted** in ${message.channel}.\n
        **Deleted Message**:\n\`${message.content ? message.content : "None"}\``.slice(0, 4096))
        .setFooter({
            text: `Member: ${message.author.tag} | ID: ${message.author.id}`
        })

        if (message.attachments.size >= 1) {
            Log.addField(`Aattachments:`, `${message.attachments.map(a => a.url)}`, true)
        }

        await message.guild.channels.cache.get(chatLogsID).send({embeds: [Log]});
    }
}