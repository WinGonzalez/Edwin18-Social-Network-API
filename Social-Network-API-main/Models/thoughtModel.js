const mongoose = require('mongoose');
const reactionSchema = require('./reactionSchema');

// Define the schema for a "Thought"
const thoughtSchemaDefinition = {
    content: {
        type: String,
        required: true,
        minlength: 1, // Minimum length of 1 character
        maxlength: 280, // Maximum length of 280 characters (similar to a tweet)
    },
    createdAt: {
        type: Date,
        default: Date.now, 
        get: timestamp => new Date(timestamp).toLocaleDateString(), 
    },
    author: {
        type: String,
        required: true, // Author is required
    },
    reactions: [reactionSchema], // Include reactions
};

// Create the thought schema with the defined structure and options
const thoughtSchema = new mongoose.Schema(thoughtSchemaDefinition, {
    toJSON: { getters: true }, 
    toObject: { getters: true },
});

// Virtual property for counting reactions
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length; // Count the number of reactions
});

// Compile the schema into a model
const Thought = mongoose.model('Thought', thoughtSchema);


module.exports = Thought;
