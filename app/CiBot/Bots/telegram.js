const TelegramBot = require('node-telegram-bot-api');
const botConf = require('../botconf_telegram.json')
var dockerApi = require('../DockerControll/dockerApi.js');
const bot = new TelegramBot(botConf.token, {
    polling: true
});
const promisifyStream = (stream, chatId) => new Promise((resolve, reject) => {
    stream.on('data', (d) => {
        var status = JSON.parse(d.toString()).status
        if (status === "destroy") {
            bot.sendMessage(chatId, "Se ha Terminado la ejecución del JOB. Revise si la información ha sido migrada correctamente")

        }
    })
    stream.on('end', () => bot.sendMessage(chatId, "Ejecución del Job FInalizada..."))
    stream.on('error', () => bot.sendMessage(chatId, "Error en el Job..."))
})
module.exports = {
    run: function () {
        bot.onText(/\/cdp (.+)/, async (msg, match) => {

            const chatId = msg.chat.id;
            console.log(match[1]);
            var valores = match[1].split(" ")
            const disponibilidad = parseInt(valores[0]) // the captured "whatever"
            const vigencia = parseInt(valores[1])
            if (isNaN(disponibilidad) || isNaN(vigencia)) {
                bot.sendMessage(chatId, 'Wrong Parameter!!');
            } else {
                var image = await dockerApi.imageExec("migracion_cdp:0.1", "migration", ['ARGS=--context_param disponibilidad=' + disponibilidad + ' --context_param vigencia=' + vigencia], {
                    AutoRemove: true,
                    NetworkMode: "udistrital_core_db_default"
                })

                bot.sendMessage(chatId, "Trabajando en su petición...");
                var containerEvents = dockerApi.conatinerEvents("migration")
                containerEvents.then((stream) => promisifyStream(stream, chatId) //promisifyStream(stream)
                ).catch((error) => console.log(error))


            }

        })
    }
}