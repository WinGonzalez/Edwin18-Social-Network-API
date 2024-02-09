const mongoose = require('mongoose');

// Utilize a function to define default values and getters to enhance readability
const getDefaultObjectId = () => new mongoose.Types.ObjectId();
const formatDate = timestamp => new Date(timestamp).toLocaleDateString();

const reactionSchemaDefinition = {
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: getDefaultObjectId,
    },
    body: {
        type: String,
        required: true,
        maxlength: 280, // Max length to ensure concise reactions
    },
    author: {
        type: String,
        required: true, // Author must always be provided
    },
    createdAt: {
        type: Date,
        default: Date.now, // Use the current date and time as the default
        get: formatDate, // Format the date when it's retrieved
    },
};

// Define the schema with options to apply getters globally
const reactionSchema = new mongoose.Schema(reactionSchemaDefinition, {
    toJSON: { getters: true },
    toObject: { getters: true },
});

module.exports = reactionSchema;
