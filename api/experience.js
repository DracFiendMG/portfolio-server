const connectToCollection = require('../db');

const collectionName = 'experience';

async function getExperience(req, res) {
    try {
        const collection = await connectToCollection(collectionName);
        const experience = await collection.find({}).toArray();

        if (!experience) {
            return res.status(404).json({ error: "Experience not found" });
        }

        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all domains to access this API
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        return res.status(200).json(experience);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = getExperience;