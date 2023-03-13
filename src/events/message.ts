import { GuildMember, Message, ComponentType, ButtonStyle } from "discord.js";
import { addPoints } from "$db/api/member";
import { messagePoints } from "$utils/equations";
// import { config } from "$context/config";

const lastMessages: Map<string, Date> = new Map();

export async function handleMessageCreated(message: Message) {
    if (!(message.member instanceof GuildMember)) {
        return;
    }

    await points(message.member);
}

async function points(member: GuildMember) {
    const lastMessageDate = lastMessages.get(member.id);
    if (lastMessageDate && lastMessageDate.getTime() + 1000 * 10 > Date.now()) {
        return;
    }

    lastMessages.set(member.id, new Date());
    const contribPoints = messagePoints();
    await addPoints(member, contribPoints);
}
