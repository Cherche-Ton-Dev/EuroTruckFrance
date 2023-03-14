import { ApplicationCommandPermissions, ChatInputCommandInteraction, CommandInteraction, EditApplicationCommandPermissionsMixin, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js"

declare type CommandModule = {
    data: RESTPostAPIChatInputApplicationCommandsJSONBody,
    perms?: ApplicationCommandPermissions[],
    execute: (inter: ChatInputCommandInteraction) => Promise<void>
}
