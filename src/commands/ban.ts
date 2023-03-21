import { botConfig } from "$config";
import { addWarn } from "$db/api/warns";
import { CommandModule } from "$types/Command";
import { discordLog } from "$utils/log";
import { ApplicationCommandOptionType, ApplicationCommandPermissionType, ButtonStyle, Colors, ComponentType, GuildMember, PermissionFlagsBits, TextChannel, ThreadAutoArchiveDuration } from "discord.js";
export default {
    data: {
        name: "ban",
        description: "Bannis la personne du serveur.",
        options: [
            {
                type: ApplicationCommandOptionType.User,
                name: "cible",
                description: "a qui s'applique ce ban",
                required: true
            },
            {
                type: ApplicationCommandOptionType.String,
                name: "raison",
                description: "Raison du ban",
                required: true
            },
        ]
    },


    execute: async (inter) => {
        if (!(inter.member instanceof GuildMember) || !(inter.channel instanceof TextChannel)) return;

        const mem = await inter.member.fetch();
        if (!mem.roles.cache.has(botConfig.modRole)) {
            await inter.reply({
                content: "Tu n'as pas la permission d'utiliser cette commande",
                ephemeral: true
            })
            return;
        }
        const m = inter.options.getMember("cible");
        const r = inter.options.getString("raison");
        if (!m || !r || !(m instanceof GuildMember)) return;

        await m.send("Tu as été kick\n" + "```\n" + r + "\n```")
        await m.ban({
            reason: r
        });

        await inter.reply("L'utilisateur a été ban.");

        await discordLog(inter.member, {
            title: "Ban",
            description: m.user.tag + " á été banni." + "\n```" + r + "\n```",
            author: {
                name: inter.user.tag,
                icon_url: inter.user.displayAvatarURL()
            },
            thumbnail: {
                url: m.user.displayAvatarURL(),
            },
            timestamp: new Date().toISOString(),
            color: Colors.Red
        });
    }
} as CommandModule;