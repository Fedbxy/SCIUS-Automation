const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "voice",
  description: "Control your voice channel.",
  options: [
    {
      name: "invite",
      type: "SUB_COMMAND",
      description: "Invite a friend to your channel.",
      options: [
        {
          name: "member",
          type: "USER",
          required: true,
          description: "Select the member."
        }
      ]
    },
    {
      name: "disallow",
      type: "SUB_COMMAND",
      description: "Remove someone's access to the channel.",
      options: [
        { 
          name: "member",
          type: "USER",
          required: true,
          description: "Select the member."
        }
      ]
    },
    {
      name: "name",
      type: "SUB_COMMAND",
      description: "Change the name of the channel.",
      options: [
        { 
          name: "text",
          type: "STRING",
          required: true,
          description: "Provide the name."
        }
      ]
    },
    {
      name: "public",
      type: "SUB_COMMAND",
      description: "Make the channel public to all members.",
      options: [
        { 
          name: "toggle",
          type: "STRING",
          required: true,
          description: "Toggle on and off.",
          choices: [
            { name: "On", value: "on"},
            { name: "Off", value: "off"}
          ]
        }
      ]
    }
  ],
  /**
  * @param {CommandInteraction} interaction
  */
  async execute(interaction, client) {
    const { options, member, guild } = interaction;

    const subCommand = options.getSubcommand();
    const voiceChannel = member.voice.channel;
    const Embed = new MessageEmbed().setColor("BLUE");
    const ownedChannel = client.voiceGenerator.get(member.id);

    if(!voiceChannel)
      return interaction.reply({embeds: [Embed.setDescription("You are not in a voice channel.").setColor("RED")], ephemeral: true});

    if(!ownedChannel || voiceChannel.id !== ownedChannel)
      return interaction.reply({embeds: [Embed.setDescription("You do not own this voice channel.").setColor("RED")], ephemeral: true});

    switch(subCommand) {
      case "name" : {
        const newName = options.getString("text");
        if(newName.length > 22 || newName.lenght < 1)
          return interaction.reply({embeds: [Embed.setDescription("Name must be between 1 to 22 character.").setColor("RED")], ephemeral: true});

        voiceChannel.edit({ name: newName });
        interaction.reply({embeds: [Embed.setDescription(`Channel's name has been set to ${newName}.`).setColor("GREEN")], ephemeral: true});
      }
      break;
      case "invite" : {
        const targetMember = options.getMember("member");
        voiceChannel.permissionOverwrites.edit(targetMember, {CONNECT: true});

        await targetMember.send({embeds: [Embed.setDescription(`${member} has invited you to <#${voiceChannel.id}>`)]});
        interaction.reply({embeds: [Embed.setDescription(`${targetMember} has been invited.`).setColor("GREEN")], ephemeral: true});
      }
      break;
      case "disallow" : {
        const targetMember = options.getMember("member");
        voiceChannel.permissionOverwrites.edit(targetMember, {CONNECT: false});

        if(targetMember.voice.channel && targetMember.voice.channel.id == voiceChannel.id) targetMember.voice.setChannel(null);
        interaction.reply({embeds: [Embed.setDescription(`${targetMember} has been removed from this channel.`)], ephemeral: true})
      }
      break;
      case "public" : {
        const toggleChoice = options.getString("toggle");
        switch(toggleChoice) {
          case "on" : {
            voiceChannel.permissionOverwrites.edit(guild.id, {CONNECT: null});
            interaction.reply({embeds: [Embed.setDescription(`The channel is now public.`)], ephemeral: true})
          }
          break;
          case "off" : {
            voiceChannel.permissionOverwrites.edit(guild.id, {CONNECT: false});
            interaction.reply({embeds: [Embed.setDescription(`The channel is now private.`)], ephemeral: true})
          }
          break;
        }
      }
      break;
    }
  }
}