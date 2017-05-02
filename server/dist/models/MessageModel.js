"use strict";
const mongoose = require("mongoose");
/**
 * Create the mongoose message schema.
 */
const schema = new mongoose.Schema({
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
schema.statics.list = (sourceId) => {
    try {
        return exports.Message.find({ source: sourceId })
            .sort('-created')
            .exec();
    }
    catch (err) {
        return Promise.reject(err);
    }
};
exports.Message = mongoose.model('Message', schema);
//# sourceMappingURL=MessageModel.js.map