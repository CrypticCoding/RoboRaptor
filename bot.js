const Discord = require("discord.js");
const config = require("./config.json");
const token = require("./roboRaptor.json");
const guildID = "457800066069954570";

const bot = new Discord.Client();

const myToken = "NTI5MzM5NjQ0OTk1OTYwODQy.DwvZ-Q.fZEO5SlSC39mZINGaCfHRzwMHfc"; 

bot.on("ready", async () =>{
    console.log(`${bot.user.username} is online`);
    // bot.guilds
    var memberCount = bot.guilds.get(guildID).members.size;
    bot.user.setActivity(memberCount+" "+"Members",{type: "Watching"});
    
    
    
})
bot.on("message", async message =>{
    if (message.author.bot) {
        return;
    }
    if (message.channel.type == "dm"){
        return;
    }
   let prefix = config.prefix;
   let msgArray = message.content.split(" ");
   let cmd = msgArray[0];
   let args = msgArray.slice(1);

   bot.on("guildMemberAdd", async () =>{
    return message.reply("Welcome To The Server" + `${member.user.tag}` + ".Everyone Say Hello")
    })

   // commands
    switch(cmd){
        

        case `${prefix}ServerInfo`:
            let icon = message.author.avatarURL;
            let authorName = message.guild.owner.displayName;
            

            let botStuff = new Discord.RichEmbed()

            .setTitle("ServerInformation")
            .addBlankField()
            .setColor("#F5FFFA")
            .setThumbnail(icon)
            .addField("Author Of The Server", authorName)
            .addField("Server Name", message.guild.name)
            .addField("Created On", message.guild.joinedAt)
            .addField("Memebers", message.guild.members.size);
            
        
            return message.channel.sendEmbed(botStuff);
            break;
        case `${prefix}Hello` ||`${prefix}hello` || `${prefix}Hi` || `${prefix}hi`:
            return message.channel.sendMessage("Hi!" + message.author + "How Are You!");
            break;

        case `${prefix}BotInfo`:
            let url = "https://www.youtube.com/channel/UCLtcXpEuZo-Px7Hzm_tflGQ?view_as=subscriber";
            let info = new Discord.RichEmbed()
            .setTitle("Bot Information")
            .setDescription("Description About The Bot")
            //.addBlankField()
            .addField("Programmer", "Saugat Siddiky Jarif")
            .addField("Bot Name", bot.user.username)
            .setColor("#30dbd6")
            .addField("Youtube Channel", "Cryptic Coding")
            .addField("Click To Goto The Channel", url)
            .setThumbnail("https://yt3.ggpht.com/-M8WKk6aG50Q/AAAAAAAAAAI/AAAAAAAAATU/dMuWHFK4VOo/s288-mo-c-c0xffffffff-rj-k-no/photo.jpg");
            return message.channel.sendEmbed(info);
            break;

        case `${prefix}Ping`:
            let ping = bot.ping;
            const m = await message.channel.send("Ping?");
            m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);

            return message.channel.sendMessage("Your Ping Is "+ping);
        case `${prefix}ClearChannel`:
            
            if (!message.member.roles.some(r=>["Administrator", "Moderator", "Owner"].includes(r.name))){
                const deleteCount = parseInt(args[0], 10);
            
                // Ooooh nice, combined conditions. <3
                if(!deleteCount || deleteCount < 2 || deleteCount > 100)
                    return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
            
                // So we get our messages, and delete them. Simple enough, right?
                const fetched = await message.channel.fetchMessages({limit: deleteCount});
                message.channel.bulkDelete(fetched)
                .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
            }
        case `${prefix}Kick`:
            if(!message.member.roles.some(r=>["Administrator", "Moderator", "Owner"].includes(r.name))){
                let member = message.mentions.members.first() || message.guild.members.get(args[0]);
                if(!member)
                    return message.reply("Please mention a valid member of this server");
                if(!member.kickable) 
                    return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
            
                let reason = args.slice(1).join(' ');
                if(!reason) reason = "No reason provided";


                await member.kick(reason)
                .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
                message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
                break;
            
            }
            case `${prefix}ban`:
                if(!message.member.roles.some(r=>["Administrator", "Moderator", "Owner"].includes(r.name))){
                    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
                    if(!member)
                        return message.reply("Please mention a valid member of this server");
                    if(!member.bannable) 
                        return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
                
                    let reason = args.slice(1).join(' ');
                    if(!reason) reason = "No reason provided";


                    await member.ban(reason)
                    .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
                    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
                    break;
                
                }
            case `${prefix}AuthorName`:
                let authorName = message.guild.owner.displayName;
                return message.reply("The Author Of The Server Is" + authorName);
            case `${prefix}ProgrammerName`:
                return message.reply("The Author Of The Server Is Saugat Siddiky Jarif");
               
    }
})
bot.login(myToken);





