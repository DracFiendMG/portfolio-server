const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require('dotenv').config();  // Ensure you load the .env variables

const app = express();
app.use(cors());
app.use(express.json());

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
    }
});

const dbName = 'portfolio';
const collectionName = 'projects';

let db, collection;

async function connectDB() {
    try {
        await client.connect();
        db = client.db(dbName);
        collection = db.collection(collectionName);
        console.log(`Connected to MongoDB database: ${dbName}`);
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
    }
}

connectDB();

app.get('/api/projects', async (req, res) => {
    try {
        const projects = await collection.find({}).toArray();
        console.log('This is my projects list: ', projects);
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// For production environment, serve Angular static files
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.use(express.static(path.join(__dirname, 'dist')));  // Adjust 'dist' if needed
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
