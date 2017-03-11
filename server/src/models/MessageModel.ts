import * as mongoose from 'mongoose';
import { IMessage } from "../shared/IMessage";

export interface IMessageDocument extends IMessage, mongoose.Document { }

/** 
 * Create the mongoose message schema.
 */
const messageSchema: mongoose.Schema = new mongoose.Schema({
    content: String,
    type: String,
    created: {
        type: Date,
        default: Date.now
    },
    source: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Source'
    }
});

/**
 * The mongoose type and model of a message.
 */
export type MessageModel = mongoose.Model<IMessageDocument>;
export const Message: MessageModel = <MessageModel> mongoose.model<IMessageDocument>('Message', messageSchema);

