const {Telegraf, Markup} = require('telegraf');
const {xNumOfCookies} = require('./fortune-cookie')

const BOT_TOKEN = process.env.BOT_TOKEN
const bot = new Telegraf(BOT_TOKEN)


const keyboard = Markup.keyboard([
    Markup.button.pollRequest('Create poll', 'regular'),
    Markup.button.pollRequest('Create quiz', 'quiz')
  ])

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

    //ctx.reply("I can give you a fortune-cookie. Simply hit the button below")
    ctx.replyWithMarkdown("I can give you a fortune-cookie. Simply hit the button below", keyboard)

})

const PORT = process.env.PORT

bot.launch({
    webhook: {
      domain: 'https://thefakerealbot.herokuapp.com/',
      port: PORT
    }
  })