import { GuildMember } from "discord.js";
import { DBMember } from "$db/schemas/member";

export async function getMember(member: GuildMember): Promise<DBMember | null> {
    return await DBMember.findOne({
        discordID: member.id,
        guildID: member.guild.id,
    });
}
export function createMember(member: GuildMember): DBMember {
    return new DBMember({
        discordID: member.id,
        guildID: member.guild.id,
        username: member.user.username,
    });
}
export async function createOrGetMember(
    member: GuildMember,
    save = false,
): Promise<DBMember> {
    let dbMember = await getMember(member);
    if (!dbMember) {
        dbMember = createMember(member);
        if (save) await dbMember.save();
    }
    return dbMember;
}

export async function addPoints(member: GuildMember, points: number) {
    if (member.user.bot) return;

    let dbMem = await DBMember.findOneAndUpdate(
        { discordID: member.id, guildID: member.guild.id },
        { $inc: { score: points } },
        { new: true },
    );

    if (!dbMem) {
        dbMem = createMember(member);
        dbMem.score = points;
        await dbMem.save();
    }

    return dbMem;
}
