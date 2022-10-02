import { Client, GatewayIntentBits} from 'discord.js'
import { REST, Routes } from 'discord.js'
import lists from './config/lists.json'
import replies from './config/replies.json'
import emojis from './config/emojis.json'
import whiteListHandler from './handlers/whiteListHandler.js'
import blackListHandler from './handlers/blackListHandler.js'
import superUserHandler from './handlers/superUserHandler.js'
import dotenv from 'dotenv'
dotenv.config()

const token = process.env.BOT_TOKEN;
console.log(token)

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands('1024511093697163285'), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({ intents: [		
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
] });

const PREFIX = '!';
client.on('ready', () => {
    console.log(`${client.user.tag} online!`)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }
  });

client.on('messageCreate', (message) => {

    let args = message.content.substring(PREFIX.length).split(' ');
    const isBlackListed = lists.blacklist.includes(message.author.tag)

    // Handle commands with '!' prefix
    if (message.content.startsWith(PREFIX)) {
        if (message.author.tag == "Shippo#2062")
            superUserHandler(args, message);
        else {
            isBlackListed ? blackListHandler(args, message) : whiteListHandler(args, message)
        }
    } else { // Handle general messaging
        
        if (isBlackListed) {
            const bojjiBotRegex = new RegExp("bojji(\\s|-)?bot");
            const greetBotRegex = new RegExp("(hi|hello|hey)\\sbojji(\\s|-)?bot");
            const notMidRegex = new RegExp("(\\s|^)not\s(mid|mld|m!d)(\\s|$)");
            const midRegex = new RegExp("(\\s|^)(mid|mld|m!d)(\\s|$)");
            const botHateRegex = new RegExp("(.)*\shate\\s(.)*this\\s(.)*(bot[^a-z]|bot$)");
            const botRegex = new RegExp("(.)*(a|this)\\s+(bot[^a-z]|bot$)");
            const timeRegex = new RegExp("(.)*in\\s((like|about)\\s)?[1-9]+\s*([a-zA-Z]*\\s)*(min|ish)(.)*");
            const time2Regex = new RegExp("gimme\\s((like|about)\\s)?[0-9]+\\s*([a-zA-Z]*\\s)*(min|ish)")
            const strawmanRegex = new RegExp("(.)*so\\s+(.)*(saying|okay)(.)*");
            const interestingRegex = new RegExp("(hmm*|that(.)?(.))?\\s?interesting\\s?(how|because)(.)*");
            const bitchesRegex = new RegExp("(no|some)\\sbitches");
            const banRegex = new RegExp("ban\\s(it|this\\sbot)");
            const crazyRegex = new RegExp("^((that(.)?s)\\s)?crazy\\s(how|because)(.)*");
            const agreeRegex =  new RegExp("(\\s|^)agree(s|d)\\swith\\sme(\\s|$)")
            const fifthRegex = new RegExp("(is|be|)\\sour\\s5th(\sfor)?")
            const wymRegex = new RegExp("(\\s|^)wym(\\s|$)");
            const youMeanRegex = new RegExp("^(oh)?\\s?you\\smean")
            const iKnowIsntTalkingRegex = new RegExp("i\\sknow\\s(.)*isn(')?t\\s(talking|typing)")
            const okAndRegex = new RegExp("(ok|okay)\\s?(and)?\?")
            const yesRegex = new RegExp("^(ye|yes)$")
            const noRegex = new RegExp("^(no|nah)$")
            const sorryRegex = new RegExp("sorry")

            const badGeneralReplies = replies.bad.general;

            if (message.mentions.has(client.user))
                message.reply("What the heck do *you* want?");
            else if (notMidRegex.test(message.content.toLowerCase()))
                message.channel.send("... What?")
            else if (midRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.mid[Math.floor(Math.random() * badGeneralReplies.mid.length)]);
            else if (botHateRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.botHate[Math.floor(Math.random() * badGeneralReplies.botHate.length)]);
            else if (botRegex.test(message.content.toLowerCase()))
                message.reply(badGeneralReplies.bot[Math.floor(Math.random() * badGeneralReplies.bot.length)])
            else if (timeRegex.test(message.content.toLowerCase())) {
                message.react("🧢")
                message.channel.send(badGeneralReplies.time[Math.floor(Math.random() * badGeneralReplies.time.length)]);
            }
            else if (time2Regex.test(message.content.toLowerCase())) {
                message.react("🧢")
                message.channel.send(badGeneralReplies.time[Math.floor(Math.random() * badGeneralReplies.time.length)]);
            }
            else if (strawmanRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.strawman[Math.floor(Math.random() * badGeneralReplies.strawman.length)]);
            else if (interestingRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.interesting[Math.floor(Math.random() * badGeneralReplies.interesting.length)]);
            else if (bitchesRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.bitches[Math.floor(Math.random() * badGeneralReplies.bitches.length)]);
            else if (banRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.ban[Math.floor(Math.random() * badGeneralReplies.ban.length)]);
            else if (crazyRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.crazy[Math.floor(Math.random() * badGeneralReplies.crazy.length)]);
            else if (agreeRegex.test(message.content.toLowerCase()))
                message.channel.send("No one ever agrees with you.")
            else if (fifthRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.fifth[Math.floor(Math.random() * badGeneralReplies.fifth.length)]);
            else if (wymRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.wym[Math.floor(Math.random() * badGeneralReplies.wym.length)]);
            else if (youMeanRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.youMean[Math.floor(Math.random() * badGeneralReplies.youMean.length)]);
            else if (iKnowIsntTalkingRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.iKnowIsntTalking[Math.floor(Math.random() * badGeneralReplies.iKnowIsntTalking.length)]);
            else if (okAndRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.okAnd[Math.floor(Math.random() * badGeneralReplies.okAnd.length)]);
            else if (yesRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.yes[Math.floor(Math.random() * badGeneralReplies.yes.length)]);
            else if (noRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.no[Math.floor(Math.random() * badGeneralReplies.no.length)]);
            else if (sorryRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.sorry[Math.floor(Math.random() * badGeneralReplies.sorry.length)]);
            else if (greetBotRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.greetBot[Math.floor(Math.random() * badGeneralReplies.greetBot.length)]);
            else if (bojjiBotRegex.test(message.content.toLowerCase()))
                message.channel.send(badGeneralReplies.bojjiBot[Math.floor(Math.random() * badGeneralReplies.bojjiBot.length)]);
            else if (message.content.includes("<:sadge:834236789127512103>"))
                message.react("🤨")
            else if (message.content.includes("<:pepeEZ:875203033699598417>"))
                message.react("🤓")
            else if (message.content.includes("<:PogO:927963796973178910>"))
                message.react("🙄")
            else if (message.content.includes("<a:Chatting:873427022293131304>"))
                message.react("🙄")
        } else { // not blacklisted

            const greetBotRegex = new RegExp("(hi|hello|hey)\\sbojji(\\s|-)?bot");

            if (message.mentions.has(client.user))
                message.reply("Hi there!");
            else if (greetBotRegex.test(message.content.toLowerCase()))
                message.channel.send(replies.good.general.greet[Math.floor(Math.random() * replies.good.general.greet.length)]);
        }
    }
    
})



client.login(token);