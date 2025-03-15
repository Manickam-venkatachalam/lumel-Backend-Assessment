const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://dbadmin:testPassword123@localhost:27017/admin'
async function connectToMongoDB() {
    try {
        console.log('Attempting connection to ', MONGODB_URI);
        await mongoose.connect(MONGODB_URI, {
            readPreference: 'secondaryPreferred',
            authMechanism: 'SCRAM-SHA-1',
            socketTimeoutMS: 30000,
            serverSelectionTimeoutMS: 10000
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
    }
});

module.exports = {
    connectToMongoDB
};