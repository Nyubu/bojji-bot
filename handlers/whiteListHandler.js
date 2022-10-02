import replies from '../config/replies.json'
import lists from '../config/lists.json'

const whiteListHandler = (args, message) => {

    switch (args[0]) {
        case 'pet':
            message.reply(replies.good.pet[Math.floor(Math.random() * replies.good.pet.length)]);
            break;
        case 'insult':
            // message.reply('pong!');
            message.react('👎')
            break;
        case 'praise':
            message.reply('pong!');
            break;
        case 'praise':
            message.reply('pong!');
            break;
        case 'stand':
            const isStandUser = lists.standUsers.includes(message.author.tag)
            if (!isStandUser) {
                message.reply("You're not a stand user");
                return
            }
            if (args[2]) {
                handleStandCall(args[2])
                return;
            }
            break;
        default:
            message.channel.send("Invalid command!")
    }
}
export default whiteListHandler