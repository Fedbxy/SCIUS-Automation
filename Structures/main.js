const { Client, Intents, Collection } = require("discord.js");
const client = new Client({intents: 32767});
require('dotenv').config()
const TOKEN = process.env.TOKEN;
const keppAlive = require("../server");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

client.commands = new Collection();
client.voiceGenerator = new Collection();

const { DisTube } = require("distube");
const { SpotifyPlugin } = require('@distube/spotify');

client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  leaveOnEmpty: true,
  emitAddSongWhenCreatingQueue: false,
  youtubeDL: false,
  plugins: [new SpotifyPlugin()],
});
module.exports = client;

["Events", "Commands"].forEach(handler => {
  require(`./Handlers/${handler}`)(client, PG, Ascii);
});

keppAlive();
client.login(TOKEN);