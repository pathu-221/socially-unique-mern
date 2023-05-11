import { MongoClient, Db } from 'mongodb';

const client = new MongoClient(process.env.ATLAS_URI);

let _db:Db;

async function connect() {
    try {

        const db = await client.db('social_media');
        _db = db;

        console.log('connected to database');
        // Query for a movie that has the title 'Back to the Future'

      } catch (err) {
        console.error(err);
      }
}

async function getDb<Db>() {
    if(!_db) {
        await connect();  
    }
    return _db;
}

export { getDb };