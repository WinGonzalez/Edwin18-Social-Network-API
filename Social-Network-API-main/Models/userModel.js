const mongoose = require('mongoose');

// Regex for email validation
const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Schema definition for a User
const userSchemaDefinition = {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: emailValidationRegex, // Ensure email follows a specific pattern
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Thought',
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    }],
};

// Creating the schema 
const userSchema = new mongoose.Schema(userSchemaDefinition);

// Virtual property for friendCount
userSchema.virtual('friendCount').get(function() {
    return this.friends.length; // Calculate the number of friends
});

// Compiling schema into a Model
const User = mongoose.model('User', userSchema);


module.exports = User;
