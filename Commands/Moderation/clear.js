const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "clear",
    description: "Deletes a specified number of messages from a channel or a target.",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "amount",
            description: "Provide the amount of message(s) to delete from the channel or the target.",
            type: "INTEGER",
            required: true
        },
        {
            name: "target",
            description: "Select a target to clear their messages.",
            type: "USER",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { channel, options } = interaction;

        const Amount = options.getInteger("amount");
        const Target = options.getMember("target");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor("YELLOW");

        if(Amount > 100 || Amount <= 0) {
            Response.setDescription(`Amount must be between 1 and 100.`)
            return interaction.reply({embeds: [Response], ephemeral: true})
        }

        if(Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`🧹 Cleared **${messages.size}** messages from ${Target}.`);
                interaction.reply({embeds: [Response]});
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`🧹 Cleared **${messages.size}** messages from this channel.`);
                interaction.reply({embeds: [Response]});
            })
        }
    }
}