import * as mongoose from 'mongoose';
import { IMessage } from "../shared/IMessage";

export interface IMessageDocument extends IMessage, mongoose.Document { }

export interface IMessageModel {
    /**
     * List all messages of the given source, sorted by their created-timestamp descending.
     * @param sourceId the id of the source
     * @return Promise that provides an array of {@link IMessageDocument}s.
     */
    list(sourceId: mongoose.Types.ObjectId): Promise<IMessageDocument[]>
}

/** 
 * Create the mongoose message schema.
 */
const schema: mongoose.Schema = new mongoose.Schema({
    content: String,
    address: String,
    type: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
    source: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Source',
        required: true
    }
});

/**
 * List all messages of the given source, sorted by their created-timestamp descending.
 * @param sourceId the id of the source
 * @return Promise that provides an array of {@link IMessageDocument}s.
 * @static
 */
schema.statics.list = (sourceId: mongoose.Types.ObjectId): Promise<IMessageDocument[]> => {
    try {
        return Message.find({ source: sourceId })
            .sort('-created')
            .exec();
    } catch (err) {
        return Promise.reject(err);
    }
};

/**
 * The mongoose type and model of a message.
 */
export type MessageModel = mongoose.Model<IMessageDocument> & IMessageModel;
export const Message: MessageModel = <MessageModel>mongoose.model<IMessageDocument>('Message', schema);

