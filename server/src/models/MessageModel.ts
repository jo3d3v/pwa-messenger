import * as mongoose from 'mongoose';
import { IMessageDocument } from "../interfaces/IMessageDocument";

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
 * The mongoose model of a message.
 */
export const MessageModel: mongoose.Model<IMessageDocument> = mongoose.model<IMessageDocument>('Message', messageSchema);

