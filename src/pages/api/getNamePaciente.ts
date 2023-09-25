import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end(); 
  }

  const query = req.query.query as string;

  if (!query) {
    return res.status(400).json({ error: 'Consulta é obrigatória' });
  }

  const connectionString = process.env.MONGO_CONNECTION_STRING as string;
  const client = new MongoClient(connectionString);

  try {
    await client.connect();
    const database = client.db("search-db");
    const collection = database.collection("search-analysis");

    
    const searchResults = await collection.find({ name: { $regex: query, $options: 'i' } }).toArray();

    const names = searchResults.map(item => item.name);
    res.status(200).json({ names });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
        res.status(500).json({ error: process.env.NODE_ENV === 'production' ? 'Erro de servidor' : error.message });
    } else {
        res.status(500).json({ error: 'Erro de servidor' });
    }
  } finally {
    client.close();
  }
}
