import { botConfig } from "$config";
import chalk from "chalk";
import { Guild, TextChannel, APIEmbed } from "discord.js";

export function log(...args: unknown[]): void {
    console.log(chalk.magenta(new Date(Date.now()).toLocaleString()), ...args);
}

export async function discordLog({ guild }: { guild: Guild }, action: APIEmbed) {
    const channel = await guild.channels.fetch(botConfig.logChannelID);

    if (!(channel instanceof TextChannel)) {
        throw new Error("config.logChannelID is invalid");
    }

    channel.send({
        embeds: [
            action
        ]
    })

}