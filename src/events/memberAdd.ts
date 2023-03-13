import { GuildMember, TextChannel, Colors } from "discord.js";
import { log } from "$utils/log";
import { botConfig } from "$config";


export async function handleMemberAdd(
    member: GuildMember
): Promise<void> {
    const channel = await member.guild.channels.fetch(botConfig.welcomeChanelID);
    if (!(channel instanceof TextChannel))
        return log("ERREUR: welcomeChanelID invalide");


    channel.send({
        embeds: [
            {
                title: `Bonjour ${member.user.username} !`,
                description: `Bienvenue sur ${member.guild.name}.`,
                color: Colors.Green,
                thumbnail: {
                    url:
                        member.user.displayAvatarURL(),
                },
            },
        ],
    });
}
