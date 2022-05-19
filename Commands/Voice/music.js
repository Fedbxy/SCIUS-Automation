const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "music",
    description: "Interact with the music system.",
    options: [
        {
            name: "play",
            description: "Play a song.",
            type: "SUB_COMMAND",
            options: [{ name: "music", description: "Provide a name or a url of the song.", type: "STRING", required: true}]
        },
        {
            name: "volume",
            description: "Change the bot volume.",
            type: "SUB_COMMAND",
            options: [{ name: "percent", description: "100 = 100%", type: "NUMBER", required: true}] 
        },
        {
            name: "queue",
            description: "View the current music queue.",
            type: "SUB_COMMAND",
        },
        {
            name: "skip",
            description: "Skip the current music.",
            type: "SUB_COMMAND",
        },
        {
            name: "pause",
            description: "Pause the current music.",
            type: "SUB_COMMAND",
        },
        {
            name: "resume",
            description: "Resume the paused music.",
            type: "SUB_COMMAND",
        },
        {
            name: "stop",
            description: "Stop playing music in the channel.",
            type: "SUB_COMMAND",
        },
        {
            name: "shuffle",
            description: "Shuffle the queue's music.",
            type: "SUB_COMMAND",
        },
        {
            name: "autoplay",
            description: "Toggles autoplay mode.",
            type: "SUB_COMMAND",
        },
        {
            name: "relatedsong",
            description: "Add a related music of the playing music to the queue.",
            type: "SUB_COMMAND",
        },
        {
            name: "repeat",
            description: "Set the repeat mode of the guild queue.",
            type: "SUB_COMMAND",
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel} = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel)
        return interaction.reply({content: "You must be in a voice channel to use this commands.", ephemeral: true})

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({content: `I am already playing music in <#${guild.me.voice.channelId}>.`, ephemeral: true})

        try {
            switch(options.getSubcommand()) {
                case "play": {
                    client.distube.play(VoiceChannel, options.getString("music"), { textChannel: channel, member: member});
                    return interaction.reply({content: "🎼 Request received."});
                }

                case "volume": {
                    const Volume = options.getNumber("percent");
                    if(Volume > 100 || Volume < 1)
                    return interaction.reply({content: "You have to specify a number between 1 and 100."})

                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({content: `🔊 Volume has been set to \`${Volume}%\``});
                }

                case "skip": {
                    const queue = await client.distube.getQueue(VoiceChannel);
        
                    if(!queue)
                    return interaction.reply({content: "⛔ There is no music in queue."});

                    await queue.skip(VoiceChannel);
                    return interaction.reply({content: "⏭ Music has been skipped."})
                }

                case "stop": {
                    const queue = await client.distube.getQueue(VoiceChannel);
        
                    if(!queue)
                    return interaction.reply({content: "⛔ There is no music in queue."});
                    
                    await queue.stop(VoiceChannel);
                    return interaction.reply({content: "⏹ Music has been stopped."})
                }

                case "pause": {
                    const queue = await client.distube.getQueue(VoiceChannel);
        
                    if(!queue)
                    return interaction.reply({content: "⛔ There is no music in queue."});
                    
                    await queue.pause(VoiceChannel);
                    return interaction.reply({content: "⏸ Music has been paused."})
                }
                
                case "resume": {
                    const queue = await client.distube.getQueue(VoiceChannel);
        
                    if(!queue)
                    return interaction.reply({content: "⛔ There is no music in queue."});
                    
                    await queue.resume(VoiceChannel);
                    return interaction.reply({content: "▶ Music has been resumed."})
                }

                case "shuffle": {
                    const queue = await client.distube.getQueue(VoiceChannel);
        
                    if(!queue)
                    return interaction.reply({content: "⛔ There is no music in queue."});
                    
                    await queue.shuffle(VoiceChannel);
                    return interaction.reply({content: "🔀 The queue has been shuffled."})
                }

                case "autoplay": {
                    const queue = await client.distube.getQueue(VoiceChannel);
        
                    if(!queue)
                    return interaction.reply({content: "⛔ There is no music in queue."});
                    
                    let Mode = await queue.toggleAutoplay(VoiceChannel);
                    return interaction.reply({content: `🔃 Autoplay mode has been set to \`${Mode ? "On" : "Off"}\`.`})
                }

                case "relatedsong": {
                    const queue = await client.distube.getQueue(VoiceChannel);
        
                    if(!queue)
                    return interaction.reply({content: "⛔ There is no music in queue."});
                    
                    await queue.addRelatedSong(VoiceChannel);
                    return interaction.reply({content: "ℹ A related song has been added to the queue."})
                }

                case "repeat": {
                    const queue = await client.distube.getQueue(VoiceChannel);
        
                    if(!queue)
                    return interaction.reply({content: "⛔ There is no music in queue."});
                    
                    let Mode = await client.distube.setRepeatMode(queue);
                    return interaction.reply({content: `🔁 Repeat mode has been set to \`${Mode = Mode ? Mode == 2 ? "Queue" : "Song" : "Off"}\`.`})
                }

                case "queue": {
                    const queue = await client.distube.getQueue(VoiceChannel);
        
                    if(!queue)
                    return interaction.reply({content: "⛔ There is no music in queue."});

                    let songs = queue.songs.slice(1).map((song, id) => `\n**${id + 1}**. \`${song.name}\` - \`${song.formattedDuration}\``)
                    function isArrayEmpty(array) {
                        if (array.length > 0) {
                            return true
                        } else {
                            return false
                        }
                    }

                    return interaction.reply({embeds: [new MessageEmbed()
                    .setTitle("Music Queue")
                    .setColor("BLUE")
                    .setImage(queue.songs[0].thumbnail)
                    .setDescription(`🎶 | **Playing** \`${queue.songs[0].name}\` - \`${queue.songs[0].formattedDuration}\`\n\n🔢 | **Queue list:**${isArrayEmpty(queue.songs.slice(1)) ? songs : "\n`None`"}`.slice(0, 4096))
                    ]});
                }
            }
        } catch (error) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`⛔ Error: ${error}`)
            return interaction.reply({embeds: [errorEmbed]});
        }
    }
}