// POST /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://UsmanNadiry:nadiry2025@cluster0.wtqyrj6.mongodb.net/meetups'
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({
      message: "Meetup inserted!",
    });
  }
}

export default handler;
