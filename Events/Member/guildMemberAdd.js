const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
const { joinLeaveID } = require("./../../Structures/config.json");

module.exports = {
  name: "guildMemberAdd",
  /**
    * @param {GuildMember} member
    */
  async execute(member) {
    const {user, guild} = member;

    const Embed = new MessageEmbed()
    .setColor("GREEN")
    .setAuthor({
      name: user.tag,
      iconURL: user.avatarURL({dynamic: true, size: 512})
    })
    .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
    .setDescription(`
    ${member} has joined!\n
    Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLastest Member Count: **${guild.memberCount}**`)
    .setFooter({
      text: `ID: ${user.id}`
    })

    if (member.guild.channels.cache.get(joinLeaveID)) {
      await member.guild.channels.cache.get(joinLeaveID).send({embeds: [Embed]});
    }
  }
}