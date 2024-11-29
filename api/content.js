const connectToCollection = require('../db');

const collectionName = 'content';

async function getContent(req, res) {
    try {

        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: "Query parameter 'name' is required" });
        }

        const collection = await connectToCollection(collectionName);
        const content = await collection.find({ name: name }).toArray();

        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }

        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all domains to access this API
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        return res.status(200).json(content);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = getContent;
