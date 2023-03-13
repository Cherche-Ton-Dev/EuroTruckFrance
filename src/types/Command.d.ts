import { ChatInputCommandInteraction, CommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js"

declare type CommandModule = {
    data: RESTPostAPIChatInputApplicationCommandsJSONBody,
    execute: (inter: ChatInputCommandInteraction) => Promise<void>
}
