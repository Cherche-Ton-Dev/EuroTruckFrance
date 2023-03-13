import { CommandModule } from "$types/Command";

export default {
    data: {
        name: "ping",
        description: "Vérifie si le bot est bien connecté",
    },

    execute: async (inter) => {
        inter.reply(`Pong **${inter.createdTimestamp - Date.now()}ms**`);
    }
} as CommandModule;