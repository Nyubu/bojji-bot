import replies from '../config/replies.json'
import lists from '../config/lists.json'

const blackListHandler = (args, message) => {

    switch (args[0]) {
        case 'pet':
            message.reply("https://www.youtube.com/watch?v=x_7tK4Ip12A");
            break;
        case 'stand':
            const isStandUser = lists.standUsers.includes(message.author.tag)
            if (!isStandUser) {
                message.reply("You're not a stand user");
                return
            }
            if (!args[2])
                return;
            
            break;
        default:
            message.channel.send("Invalid command!")
    }
}
export default blackListHandler