const {Telegraf, Markup} = require('telegraf');
const {xNumOfCookies} = require('./fortune-cookie');
const {MenuTemplate, MenuMiddleware} = require('telegraf-inline-menu')

const BOT_TOKEN = process.env.BOT_TOKEN
const bot = new Telegraf(BOT_TOKEN)


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
  

//Inline keyboard menu
const menuTemplate = new MenuTemplate(ctx => `Hi there! Welcome to Chinnnychinchin's fortune-cookie bot. Simply hit the button below to generate a fortune-cookie or send me a query like "fortune".`)

menuTemplate.interact('Give me a cookie!', 'a', {
do: async ctx => { 
    
    const [cookie] = xNumOfCookies(1)
    ctx.reply(cookie)
    return false 

}
})

const menuMiddleware = new MenuMiddleware('/', menuTemplate)
bot.command('help', ctx => menuMiddleware.replyToContext(ctx))
bot.command('start', ctx => menuMiddleware.replyToContext(ctx))
bot.use(menuMiddleware)





//Start bot
const PORT = process.env.PORT

bot.launch({
    webhook: {
      domain: 'https://thefakerealbot.herokuapp.com/',
      port: PORT
    }
  })