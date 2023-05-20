import mongoose from "mongoose";

export async function connect() {
    try {

        const db = await mongoose.connect(process.env.ATLAS_URI);
        if(db) console.log('connected to database')

      } catch (err) {
        console.error(err);
      }
}
