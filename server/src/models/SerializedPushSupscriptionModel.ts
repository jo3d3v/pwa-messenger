import * as mongoose from 'mongoose';
import { ISerializedPushSubscription } from '../shared/ISerializedPushSubscription';

export interface ISerializedPushSubscriptionDocument extends ISerializedPushSubscription, mongoose.Document { }

export interface ISerializedPushSubscriptionModel {
    /**
     * List all push subscriptions - sorted by its create-timestamp descending.
     * @return Promise that provides an array of {@link ISerializedPushSubscriptionDocument}.
     */
    list(): Promise<ISerializedPushSubscriptionDocument[]>
}

/** 
 * Create the mongoose source schema.
 */
const schema: mongoose.Schema = new mongoose.Schema({
    endpoint: {
        type: String,
        required: true
    },
    auth: {
        type: String,
        required: true
    },
    p256dh: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now,
        required: true
    }
});

/**
 * List all push subscriptions.
 * @return Promise that provides an array of {@link ISerializedPushSubscriptionDocument}.
 * @static
 */
schema.statics.list = (): Promise<ISerializedPushSubscriptionDocument[]> => {
    try {
        return SerializedPushSubscription.find({})
            .sort('-created')
            .exec();
    } catch (err) {
        return Promise.reject(err);
    }
};

/**
 * The mongoose type and model of a source.
 */
export type SerializedPushSubscriptionModel = mongoose.Model<ISerializedPushSubscriptionDocument> & ISerializedPushSubscriptionModel;
export const SerializedPushSubscription: SerializedPushSubscriptionModel = <SerializedPushSubscriptionModel>mongoose.model<ISerializedPushSubscriptionDocument>('SerializedPushSubscription', schema);