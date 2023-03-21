import { botConfig } from "$config";
import { addWarn } from "$db/api/warns";
import { CommandModule } from "$types/Command";
import { discordLog } from "$utils/log";
import { ApplicationCommandOptionType, ApplicationCommandPermissionType, ButtonStyle, Colors, ComponentType, GuildMember, PermissionFlagsBits, TextChannel } from "discord.js";
export default {
    data: {
        name: "warn",
        description: "Ajoute un avertissement.",
        options: [
            {
                type: ApplicationCommandOptionType.User,
                name: "cible",
                description: "a qui s'applique ce warn",
                required: true
            },
            {
                type: ApplicationCommandOptionType.String,
                name: "raison",
                description: "Raison du warn",
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

        await addWarn(m, `${inter.member}: ${r}`);
        try {
            await m.send("Tu as reçu un warn: " + r);
        } catch (_) { }

        await inter.reply("L'utilisateur a été warn.")


        await discordLog(inter.member, {
            title: "Warn",
            description: `${m.user} á été warn.` + "\n```" + r + "\n```",
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