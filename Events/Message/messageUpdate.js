const { MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "messageUpdate",
    /**
     * @param {Message} oldMessage
     * @param {Message} newMessage
     */
    async execute(oldMessage, newMessage) {
        if (oldMessage.author.bot) return;

        if(oldMessage.content === newMessage.content) return;

        const Count = 1950;

        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? " ..." : "");
        const Edited = newMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? " ..." : "");

        const Log = new MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`A [message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}.\n
        **Original Message**:\n\`${Original}\` \n\n**Edited Message**:\n \`${Edited}\``.slice("0", "4096"))
        .setFooter({
            text: `Member: ${newMessage.author.tag} | ID: ${newMessage.author.id}`
        })

        await newMessage.guild.channels.cache.get("973232015354761278").send({embeds: [Log]});
    }
}