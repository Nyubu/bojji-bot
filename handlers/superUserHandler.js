import replies from '../config/replies.json'
import lists from '../config/lists.json'

const superUserHandler = (args, message) => {

    switch (args[0]) {
        case 'pet':
            message.reply(replies.good.pet[Math.floor(Math.random() * replies.good.pet.length)]);
            break;
        case 'stand':
            const isStandUser = lists.standUsers.includes(message.author.tag)
            if (!isStandUser) {
                message.reply("You're not a stand user");
                return
            }
            if (args[1]) {
                switch(args[1]) {
                    case 'zawarudo':
                        message.channel.send("https://www.youtube.com/watch?v=t-3S8gtXCUw")
                        break;
                    case 'ORA':
                        message.channel.send("https://www.youtube.com/watch?v=lS3CcDaUz-Y")
                        break;
                    default:
                        message.channel.send("That's not a stand!")
                }
            } else {
                message.reply("Please specify stand.")
            }
            break;
        default:
            message.channel.send("Invalid command!")
    }
}
export default superUserHandler