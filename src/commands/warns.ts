import { botConfig } from "$config";
import { addWarn, getWarns } from "$db/api/warns";
import { CommandModule } from "$types/Command";
import { ApplicationCommandOptionType, ApplicationCommandPermissionType, ButtonStyle, Colors, ComponentType, GuildMember, PermissionFlagsBits, TextChannel } from "discord.js";
export default {
    data: {
        name: "warns",
        description: "Affiche les warns d'un membre.",
        options: [
            {
                type: ApplicationCommandOptionType.User,
                name: "cible",
                description: "a qui s'applique ce warn",
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
        if (!m || !(m instanceof GuildMember)) return;

        const warns = await getWarns(m);

        inter.reply({
            content: warns.map(w => `<t:${Math.round(w.createdAt.getTime() / 1000)}:R> | ` + w.reason).join("\n") || "Cet utilisateur n'a reçu aucun warns.",
            allowedMentions: { users: [] }
        });
    }
} as CommandModule;