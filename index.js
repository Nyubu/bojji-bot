import { Client, GatewayIntentBits} from 'discord.js'
import { REST, Routes } from 'discord.js'
import lists from './config/lists.json'
import replies from './config/replies.json'
import emojis from './config/emojis.json'
import whiteListHandler from './handlers/whiteListHandler.js'
import blackListHandler from './handlers/blackListHandler.js'

const token = 'MTAyNDUxMTA5MzY5NzE2MzI4NQ.GRA2ga.iIPbCjC-pFH-Vw6Ad_LKBWcmaHYLXQKczC8D1w';

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
    const isBlackListed = lists?.blacklist.includes(message.author.tag)

    // Handle commands with '!' prefix
    if (message.content.startsWith(PREFIX)) {
        isBlackListed ? blackListHandler(args, message) : whiteListHandler(args, message)
    } else { // Handle general messaging
        
        if (isBlackListed) {
            const midRegex = new RegExp("(\\s|^)(mid|mld|m!d)(\\s|$)");
            const notMidRegex = new RegExp("(\\s|^)not\s(mid|mld|m!d)(\\s|$)");
            const botRegex = new RegExp("(.)*(a|this)\\s+(bot[^a-z]|bot$)");
            const timeRegex = new RegExp("(.)*in\\s((like|about)\\s)?[1-9]+\s*([a-zA-Z]*\\s)*(min|ish)(.)*");
            const time2Regex = new RegExp("gimme\\s((like|about)\\s)?[0-9]+\\s*([a-zA-Z]*\\s)*(min)")
            const botHateRegex = new RegExp("(.)*\shate\\s(.)*this\\s(.)*(bot[^a-z]|bot$)");
            const strawmanRegex = new RegExp("(.)*so\\s+(.)*(saying|okay)(.)*");
            const interestingRegex = new RegExp("(hmm*|that(.)?(.))?\\s?interesting\\s?(how|because)(.)*");
            const bitchesRegex = new RegExp("(no|some)\\sbitches");
            const banRegex = new RegExp("ban\\s(it|this\\sbot)");
            const crazyRegex = new RegExp("^((that(.)?s)\\s)?crazy\\s(how|because)(.)*");
            const agreeRegex =  new RegExp("(\\s|^)agrees\\swith\\sme(\\s|$)")

            if (message.mentions.has(client.user))
                message.reply("What the heck do *you* want?");
            else if (notMidRegex.test(message.content.toLowerCase()))
                message.channel.send("... What?")
            else if (midRegex.test(message.content.toLowerCase()))
                message.channel.send(replies.bad.general.mid[Math.floor(Math.random() * replies.bad.general.mid.length)]);
            else if (botRegex.test(message.content.toLowerCase()))
                message.reply(replies.bad.general.bot[Math.floor(Math.random() * replies.bad.general.bot.length)])
            else if (timeRegex.test(message.content.toLowerCase())) {
                message.react("🧢")
                message.channel.send(replies.bad.general.time[Math.floor(Math.random() * replies.bad.general.time.length)]);
            }
            else if (time2Regex.test(message.content.toLowerCase())) {
                message.react("🧢")
                message.channel.send(replies.bad.general.time[Math.floor(Math.random() * replies.bad.general.time.length)]);
            }
            else if (botHateRegex.test(message.content.toLowerCase()))
                message.channel.send(replies.bad.general.botHate[Math.floor(Math.random() * replies.bad.general.botHate.length)]);
            else if (strawmanRegex.test(message.content.toLowerCase()))
                message.channel.send(replies.bad.general.strawman[Math.floor(Math.random() * replies.bad.general.strawman.length)]);
            else if (interestingRegex.test(message.content.toLowerCase()))
                message.channel.send(replies.bad.general.interesting[Math.floor(Math.random() * replies.bad.general.interesting.length)]);
            else if (bitchesRegex.test(message.content.toLowerCase()))
                message.channel.send(replies.bad.general.bitches[Math.floor(Math.random() * replies.bad.general.bitches.length)]);
            else if (banRegex.test(message.content.toLowerCase()))
                message.channel.send(replies.bad.general.ban[Math.floor(Math.random() * replies.bad.general.ban.length)]);
            else if (crazyRegex.test(message.content.toLowerCase()))
                message.channel.send(replies.bad.general.crazy[Math.floor(Math.random() * replies.bad.general.crazy.length)]);
            else if (agreeRegex.test(message.content.toLowerCase()))
                message.channel.send("Except I don't.")
            else if (message.content.includes("<:sadge:834236789127512103>"))
                message.react("🤨")
            else if (message.content.includes("<:pepeEZ:875203033699598417>"))
                message.react("🤓")
            else if (messageContent.includes("<:PogO:927963796973178910>"))
                message.react("🙄")
        } else { // not blacklisted
            if (message.mentions.has(client.user)) {
                message.reply("Hi there!");
            }
        }
    }
    
})



client.login(token);