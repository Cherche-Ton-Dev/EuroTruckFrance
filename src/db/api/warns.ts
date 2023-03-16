import { Warn } from "$db/schemas/warn";
import { GuildMember } from "discord.js";

export async function addWarn(member: GuildMember, reason: string) {
    await Warn.create({
        discordID: member.id,
        reason
    })
}

export async function getWarns(member: GuildMember) {
    return Warn.find({
        discordID: member.id
    })
}