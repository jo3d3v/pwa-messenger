"use strict";
const mongoose = require("mongoose");
/**
 * Create the mongoose source schema.
 */
const schema = new mongoose.Schema({
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
schema.statics.list = () => {
    try {
        return exports.SerializedPushSubscription.find({})
            .sort('-created')
            .exec();
    }
    catch (err) {
        return Promise.reject(err);
    }
};
exports.SerializedPushSubscription = mongoose.model('SerializedPushSubscription', schema);
//# sourceMappingURL=SerializedPushSupscriptionModel.js.map