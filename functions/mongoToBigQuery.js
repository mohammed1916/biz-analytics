import { MongoClient } from 'mongodb';
import { BigQuery } from '@google-cloud/bigquery';

const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri);
const bq = new BigQuery();

exports.mongoToBigQuery = async (req, res) => {
  try {
    await client.connect();
    const db = client.db('sample_airbnb');
    const collection = db.collection('listingsAndReviews');

    const docs = await collection.find({}).limit(10).toArray();
    const rows = docs.map(doc => ({
      name: doc.name,
      summary: doc.summary || '',
      price: doc.price || '',
      bedrooms: doc.bedrooms || 0
    }));

    await bq
      .dataset('my_dataset')
      .table('my_table')
      .insert(rows);

    res.status(200).send('Data pushed to BigQuery');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err.message);
  } finally {
    await client.close();
  }
};
