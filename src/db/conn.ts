import { MongoClient, Db } from 'mongodb';

const client = new MongoClient(process.env.ATLAS_URI);

let _db:Db;

async function connect() {
    try {

        const db = await client.db('social_media');
        _db = db;

        console.log('connected to database');
        // Query for a movie that has the title 'Back to the Future'

      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
}

async function getDb<Db>() {
    if(!_db) {
        await connect();
    }
    return _db;
}

export { getDb };