var discordBot = require('../Bots/discord.js')
var dockerApi = require('../DockerControll/dockerApi.js');
var bot = discordBot.getBot()
/**
 * gitController.js
 *
 * @description :: Server-side logic for managing gits.
 */
module.exports = {

  /**
   * gitController.list()
   */
  sendDiscordPipeline: function(req, res) {
    try {
      var body = req.body
      var chanid = req.params.chan_id
      var role = req.params.role
      if (body.object_kind === undefined) {
        res.status(400);
        bot.channels.get(chanid).send('A Webhook intent failed!!!');
        return res.json({
          err: "Webhook body parse error"
        });
      }

      if (bot !== null && (body.object_attributes.status === 'success' || body.object_attributes.status === 'failed')) {
        var status = '"'
        var roleNotify = bot.channels.get(chanid).guild.roles.find("name", role)
        if (body.object_attributes.status === 'failed') {
          status = "'"
        }
        var message = '<@&' + roleNotify.id + '>\n```ml\n' +
          'Project: ' + body.project.name + '\n' +
          'Status: ' + status + body.object_attributes.status + status + '\n' +
          'Commit: "' + body.commit.url + '" \n' +
          'Message: "' + body.commit.message + '" \n' +
          'Branch: "' + body.object_attributes.ref + '" \n' +
          'Approved By: ' + body.commit.author.name + '\n' +
          ' ```'
        //bot.channels.get(chanid).send(message);
        discordBot.sendMessage(chanid, message)
      }
      return res.json({
        status: "ok"
      });

    } catch (error) {
      console.log(error)
      bot.channels.get(chanid).send('A Webhook intent failed!!!');
      res.status(500);
      return res.json({
        err: error
      });
    }
  },
  sendDiscordMergeRequest: function(req, res) {
    try {
      var body = req.body
      var chanid = req.params.chan_id
      var role = req.params.role
      if (body.object_kind === undefined) {
        res.status(400);
        bot.channels.get(chanid).send('A Webhook intent failed!!!');
        return res.json({
          err: "Webhook body parse error"
        });
      }

      if (bot !== null) {
        //console.log(bot.channels.get(chanid).guild)
        var roleNotify = discordBot.getRole(chanid,role) //bot.channels.get(chanid).guild.roles.find("name", role)
        var message = "Hey! <@&" + roleNotify.id + "> we have a Merge Request for " + body.project.name + " -> " + body.project.http_url
        discordBot.sendMessage(chanid, message)
      }
      return res.json({
        status: "ok"
      });

    } catch (error) {
      console.log(error)
      bot.channels.get(chanid).send('A Webhook intent failed!!!');
      res.status(500);
      return res.json({
        err: error
      });
    }
  },
  async dockerTest(req, res){
    try {
      //var image = await dockerApi.getImage(req.params.image)
      var image = await dockerApi.listContainers({status: ["exited"]})
      //console.log(image);
      res.json({
        data: image,
        status: "ok"
      });

    } catch (error) {
      console.log("Error ", error.message);
      return res.json({
        data: error.message,
        status: "error"
      });
    }
  }

};
