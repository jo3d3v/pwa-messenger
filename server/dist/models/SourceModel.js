"use strict";
const mongoose = require("mongoose");
/**
 * Create the mongoose source schema and a pre-save method to set the updated-at timestamp.
 */
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now,
        required: true
    }
});
/**
 * Updated-timestamp should be renewed each time a {@link Source} is saved.
 */
schema.pre("save", (next) => {
    this.updated = new Date();
    next();
});
/**
 * List all sources including their last message - sorted by its updated-timestamp descending.
 * @return Promise that provides an array of {@link ISourceDocument}.
 * @static
 */
schema.statics.list = () => {
    try {
        return exports.Source.find({})
            .populate('lastMessage')
            .sort('-updated')
            .exec();
    }
    catch (err) {
        return Promise.reject(err);
    }
};
exports.Source = mongoose.model('Source', schema);
//# sourceMappingURL=SourceModel.js.map