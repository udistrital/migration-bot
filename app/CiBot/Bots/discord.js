const Discord = require("discord.js")
const botConf = require('../botconf.json')
var dockerApi = require('../DockerControll/dockerApi.js');
const bot = new Discord.Client({
  disableEveryone: true
});
module.exports = {
    login: function() {
      bot.on("ready", async () => {
        console.log(`${bot.user.username} is online!`);
        bot.user.setActivity("Job's and Pipelines for ci", {
          type: "WATCHING"
        });

        //bot.user.setGame("on SourceCade!");
      });
      bot.on("message", async message => {
        const args = message.content.slice(botConf.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
            if(command === "running_containers") {
              // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
              // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
              var image = await dockerApi.listContainers()
              var messagetosend = '```css'+'\n'
              image.forEach(function(item){
                messagetosend = messagetosend + item.Image + ' Started At '+item.StartedAt + '\n'
              })
              messagetosend = messagetosend + "```"
              const m = await message.channel.send(messagetosend);
            }
            if(command === "stoped_containers") {
              // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
              // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
              var image = await dockerApi.listContainers({status: ["exited"]})
              var messagetosend = '```prolog'+'\n'
              image.forEach(function(item){
                messagetosend = messagetosend + item.Image + ' Finished At '+ item.FinishedAt + '\n'
              })
              messagetosend = messagetosend + "```"
              const m = await message.channel.send(messagetosend);
            }
          })
          bot.login(botConf.token);
          return bot
        },
        getBot: function() {
          return bot
        },
        getRole: function(chanid, role) {
          return bot.channels.get(chanid).guild.roles.find("name", role)
        },
        sendMessage: function(chanid, message) {
          bot.channels.get(chanid).send(message);
        }
    }
