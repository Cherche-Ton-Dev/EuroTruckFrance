import { Document, model, Schema, Types } from "mongoose";

export interface IDBMember {
    discordID: string;
    guildID: string;
    username: string;
    score: number;
}
export type DBMember = Document<unknown, unknown, IDBMember> &
    IDBMember & {
        _id: Types.ObjectId;
    };

const schema = new Schema<IDBMember>({
    discordID: { type: String, required: true },
    guildID: { type: String, required: true },
    username: { type: String, required: false },
    score: { type: Number, default: 0 }
});

export const DBMember = model<IDBMember>("member", schema);
