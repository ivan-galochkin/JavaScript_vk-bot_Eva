const VkBot = require("node-vk-bot-api")
const express = require('express');
const EvaBot = require("./eva-bot.js")

const eva_bot = new EvaBot()
const app = express();
const bot = new VkBot(process.env.BOT_TOKEN)

bot.command('ева', (ctx) => {
    eva_bot.start(ctx)
});

bot.startPolling((err) => {
    if (err) {
        console.error(err);
    }
});

app.listen(process.env.PORT);