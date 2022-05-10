const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
const { joinLeaveID } = require("./../../Structures/config.json");

module.exports = {
  name: "guildMemberRemove",
  /**
    * @param {GuildMember} member
    */
  async execute(member) {
    const {user, guild} = member;

    const Embed = new MessageEmbed()
    .setColor("RED")
    .setAuthor({
      name: user.tag,
      iconURL: user.avatarURL({dynamic: true, size: 512})
    })
    .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
    .setDescription(`
    ${member} has left 😢.\n
    Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nLastest Member Count: **${guild.memberCount}**`)
    .setFooter({
      text: `ID: ${user.id}`
    })

    if (member.guild.channels.cache.get(joinLeaveID)) {
      await member.guild.channels.cache.get(joinLeaveID).send({embeds: [Embed]});
    }
  }
}