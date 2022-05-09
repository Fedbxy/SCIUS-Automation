const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

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
    ${member} has left 😢.`)
      //\nJoined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nLastest Member Count: **${guild.memberCount}**`)
    .setFooter({
      text: `ID: ${user.id}`
    })

    await member.guild.channels.cache.get("970331417072517192").send({embeds: [Embed]});
  }
}