import { botConfig } from "$config";
import { addWarn } from "$db/api/warns";
import { CommandModule } from "$types/Command";
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

        if (!inter.member.permissions.has("Administrator")) {
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
    }
} as CommandModule;