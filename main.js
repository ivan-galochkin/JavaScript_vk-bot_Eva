const VkBot = require("node-vk-bot-api")

const EvaBot = require("./eva-bot.js")
const eva_bot = new EvaBot()


const bot = new VkBot(process.env.BOT_TOKEN)


bot.command('ева', (ctx) => {
    eva_bot.start(ctx)
});

bot.startPolling((err) => {
    if (err) {
        console.error(err);
    }
});