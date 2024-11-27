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
const collectionName = 'projects';

async function getProjects(req, res) {
    try {
        await client.connect(); // Ensure the database connection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const projects = await collection.find({}).toArray();
        return res.status(200).json(projects);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = getProjects;
