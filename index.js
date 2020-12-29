const {Telegraf} = require('telegraf');
const {xNumOfCookies} = require('./fortune-cookie')


const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply("Welcome to Chins' fortune bot"))

bot.hears('fortune', (ctx) => {

    const [cookie] = xNumOfCookies(1)
    ctx.reply(cookie)

})

bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {

    const numOfCookies = inlineQuery.query || 1;
    const responseArray = xNumOfCookies(numOfCookies).map(cookie => {return {type: 'article', id: cookie.substring(20), title: cookie, input_message_content: {"message_text": cookie}}})
    return answerInlineQuery(responseArray)
  })
  


bot.help((ctx) => {

    ctx.reply("I can tell you your fortune. Simply send me a message 'fortune'")

})

bot.launch() 