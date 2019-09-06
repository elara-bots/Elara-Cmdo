const Command  = require('../base');
const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'uptime',
            group: 'bot',
            memberName: 'uptime',
            description: 'Shows the uptime for the bot',
            examples: [`${client.commandPrefix}uptime`],
            aliases: [],
	    guildOnly: false,
            throttling: {
                usages: Globalcooldown.usage,
                duration: Globalcooldown.duration
            },
        });
    }

    async run(msg) {
	   try{
        let embed = new Discord.MessageEmbed()
            .setColor(msg.guild ? msg.guild.color : this.client.util.colors.default)
            .setTitle(`${this.client.util.emojis.robot} Uptime ${this.client.util.emojis.robot}`)
            .setFooter(msg.author.tag, msg.author.displayAvatarURL())
            .setDescription(`${moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")}`)
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
        msg.channel.send(embed);
	       }catch(e){
        this.client.error(this.client, msg, e);
        this.client.f.logger(this.client, msg, e.stack)
    }
    }
};