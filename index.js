const {Telegraf} = require('telegraf');
const {xNumOfCookies} = require('./fortune-cookie')
const express = require('express')
const expressApp = express()


const BOT_TOKEN = process.env.BOT_TOKEN
const bot = new Telegraf(BOT_TOKEN)

expressApp.use(bot.webhookCallback(`/${BOT_TOKEN}`))

expressApp.get('/', (req, res) => res.send('Hello World!'))

bot.telegram.setWebhook(`https://mybotwebhook.com/${BOT_TOKEN}`)

bot.start((ctx) => ctx.reply("Welcome to Chins' fortune bot"))

bot.on('text', ({ replyWithHTML }) => replyWithHTML('<b>Hello</b>'))

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

expressApp.listen(3000, () => { console.log(`App started on port 3000 at ${new Date()}`)})