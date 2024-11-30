const connectToCollection = require('../db');

const collectionName = 'contacts';

async function getContacts(req, res) {
    try {
        const collection = await connectToCollection(collectionName);
        const contacts = await collection.find({}).toArray();

        if (!contacts) {
            return res.status(404).json({ error: "Contacts not found" });
        }

        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all domains to access this API
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        return res.status(200).json(contacts);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = getContacts;