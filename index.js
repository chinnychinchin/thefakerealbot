const {Telegraf} = require('telegraf');
const {xNumOfCookies} = require('./fortune-cookie')

const BOT_TOKEN = process.env.BOT_TOKEN
const bot = new Telegraf(BOT_TOKEN)


bot.start((ctx) => ctx.reply("Welcome to Chins' fortune bot"))


bot.hears(new RegExp("fortune", "i"), (ctx) => {

    const [cookie] = xNumOfCookies(1)
    ctx.reply(cookie)

})

bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {

    const numOfCookies = inlineQuery.query;
    if(numOfCookies > 0 && numOfCookies < 11) {
        
        const responseArray = xNumOfCookies(numOfCookies).map(cookie => {return {type: 'article', id: cookie.substring(20), title: cookie, input_message_content: {"message_text": cookie}}})
        return answerInlineQuery(responseArray)
    }

    else{
        const responseArray = xNumOfCookies(1).map(cookie => {return {type: 'article', id: cookie.substring(20), title: cookie, input_message_content: {"message_text": cookie}}})
        return answerInlineQuery(responseArray)
    }
    
  })
  


bot.help((ctx) => {

    ctx.reply("I can tell you your fortune. Simply send me a message 'fortune'")

})
