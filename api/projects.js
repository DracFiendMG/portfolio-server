const connectToCollection = require('../db');

const collectionName = 'projects';

async function getProjects(req, res) {
    try {
        const collection = await connectToCollection(collectionName);
        const projects = await collection.find({}).toArray();

        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all domains to access this API
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        return res.status(200).json(projects);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = getProjects;
