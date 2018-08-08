var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.APP_PORT || 3000;
var git_route = require('./routes/gitRoutes');
// var discordBot = require('./Bots/discord.js')
// discordBot.login()
var telegramBot = require('./Bots/telegram.js')
telegramBot.run()
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/api/v1/discord', git_route);
app.listen(port, function () {
    console.log('app listening on port ' + port + '!');
  });
module.exports = app;
