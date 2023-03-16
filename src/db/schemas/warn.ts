import { Document, model, Schema, Types } from "mongoose";

export interface IWarn {
    discordID: string;
    reason: string;
    createdAt: Date;
    updatedAt: Date;
}
export type Warn = Document<unknown, unknown, IWarn> &
    IWarn & {
        _id: Types.ObjectId;
    };

const schema = new Schema<IWarn>({
    discordID: { type: String, required: true },
    reason: { type: String, required: true },
}, { timestamps: true });

export const Warn = model<IWarn>("warn", schema);
