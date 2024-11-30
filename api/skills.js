const connectToCollection = require('../db');

const collectionName = 'skills';

async function getSkills(req, res) {
    try {
        const collection = await connectToCollection(collectionName);
        const skills = await collection.find({}).toArray();

        if (!skills) {
            return res.status(404).json({ error: "Skills not found" });
        }

        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all domains to access this API
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        return res.status(200).json(skills);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = getSkills;