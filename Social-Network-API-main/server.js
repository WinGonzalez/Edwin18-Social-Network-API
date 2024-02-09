require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

// Environment variables
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/social-network-api';

// Database connection
const connectDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit with failure
    }
};

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Welcome to the Social Network API'));
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server start
const startServer = async () => {
    await connectDatabase(); // Ensure database is connected before starting the server
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
};

startServer().catch(console.error);
