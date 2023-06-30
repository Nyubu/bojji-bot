import { Client, GatewayIntentBits} from 'discord.js'
import { REST, Routes } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

// const token = process.env.BOT_TOKEN;
const token = process.env.TEST_BOT_TOKEN;

const client = new Client({ intents: [		
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
] });

client.on('ready', () => {
    console.log(`${client.user.tag} online!`)
})

async function clear() {
    await msg.channel.bulkDelete(100);
}

client.on("messageCreate", async (msg) => {
    const prefixRegex = new RegExp("^@$");
    if (prefixRegex.test(msg.content.toLowerCase())) {
        await msg.channel.bulkDelete(100);
        msg.channel.send(`.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n_`)
    }
});

client.login(token);