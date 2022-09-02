// URL: /api/new-meetup
import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body; // return an body object

    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      'mongodb+srv://110:110@cluster0.vkvphjv.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db(); // to get hold of that database which we connect here.

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data); // insetOne is a promise => insert one document into this collection. the document is an object in the end. // result here is an object with generated ID.

    console.log(result);

    client.close(); // close the database connection when we done

    res.status(201).json({ message: 'Meetup inserted!' }); // 201 is like a signal that sth inserted successfully, then chain the json method to prepare json data that will be added to the outgoing response.
  } // only POST request will trigger the if statement
}

export default handler;
