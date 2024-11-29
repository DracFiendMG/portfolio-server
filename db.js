const { MongoClient, ServerApiVersion } = require("mongodb");

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;
const appName = process.env.MONGO_DB;

const uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&appName=${appName}`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const dbName = 'portfolio';

async function connectToCollection(collectionName) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        return collection;
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        throw err; // Propagate the error to handle it in the API
    }
}

module.exports = connectToCollection;