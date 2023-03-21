import { botConfig } from "$config";
import { Colors, GuildMember } from "discord.js";

export async function createTicket(owner: GuildMember, type: string) {
    const channel = await owner.guild.channels.create({
        name: type + "〜" + owner.user.tag,
        topic: "ticket-channel-disposable",
        permissionOverwrites: [
            {
                id: owner.guild.id,
                deny: ["ViewChannel"],
            },
            {
                id: owner.user.id,
                allow: ["ViewChannel"],
            },
            {
                id: botConfig.helperRole,
                allow: ["ViewChannel"],
            },
            {
                id: botConfig.modRole,
                allow: ["ViewChannel"],
            }
        ],
        parent: "865552254190354442"
    })

    channel.send({
        embeds: [{
            title: "Ticket",
            color: Colors.Blurple,
            timestamp: new Date().toISOString(),
            description: `${owner}`,
            fields: [
                {
                    name: "Raison",
                    value: "```\n" + type + "\n```"
                }
            ],
            thumbnail: {
                url: owner.client.user.displayAvatarURL()
            },
            author: {
                name: owner.user.tag,
                icon_url: owner.displayAvatarURL(),
            }
        },
        {
            title: `Pour fermer le ticket`,
            description: "```\n/close\n```",
            color: 0xFF0000
        }]
    })

    return channel;
}