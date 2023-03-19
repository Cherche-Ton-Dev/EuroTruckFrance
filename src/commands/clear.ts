import { botConfig } from "$config";
import { addWarn } from "$db/api/warns";
import { CommandModule } from "$types/Command";
import { getDaysBetweenDates } from "$utils";
import { discordLog } from "$utils/log";
import { ApplicationCommandOptionType, ApplicationCommandPermissionType, ButtonStyle, Colors, ComponentType, GuildMember, PermissionFlagsBits, TextChannel, APIInteractionDataResolvedGuildMember } from "discord.js";
export default {
    data: {
        name: "clear",
        description: "Supprime des message en masse.",
        options: [
            {
                type: ApplicationCommandOptionType.User,
                name: "cible",
                description: "Supprimer les messages d'un utilisateur",
                required: false
            },
            {
                type: ApplicationCommandOptionType.Number,
                name: "nombre",
                description: "Nombre de messages a supprimer.",
                required: false
            },
        ]
    },


    execute: async (inter) => {
        if (!(inter.member instanceof GuildMember) || !(inter.channel instanceof TextChannel)) return;

        if (!inter.member.permissions.has("Administrator")) {
            await inter.reply({
                content: "Tu n'as pas la permission d'utiliser cette commande",
                ephemeral: true
            })
            return;
        }
        const m = inter.options.getMember("cible");
        const n = inter.options.getNumber("nombre");
        if ((m && !(m instanceof GuildMember))) return;

        let messages = await inter.channel.messages.fetch({
            limit: Math.min(n || 100, 100)
        });
        messages = messages.filter(msg => (m ? msg.author.id == m.id : true));
        let cnt = 0;
        messages = messages.filter(msg => {
            if (getDaysBetweenDates(msg.createdTimestamp, Date.now()) >= 14) {
                msg.delete();
                cnt++;
                return false;
            }

            return true;
        })
        inter.channel.bulkDelete(messages);


        await inter.reply(messages.size + cnt + " Messages en cours de suppression.");

        await discordLog(inter.member, {
            title: "clear",
            description: `${inter.user} à clear ${messages.size + cnt} messages` + (m ? " de " + m.user.tag : "") + ` dans ${inter.channel}`,
            author: {
                name: inter.user.tag,
                icon_url: inter.user.displayAvatarURL()
            },
            timestamp: new Date().toISOString(),
            color: Colors.Red
        });
    }
} as CommandModule;