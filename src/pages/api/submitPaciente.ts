import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, InsertOneResult, ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { name } = req.body;

    const connectionString = process.env.MONGO_CONNECTION_STRING as string;
    const client = new MongoClient(connectionString);

    try {
        await client.connect();
        const database = client.db("search-db");
        const collection = database.collection("search-analysis");

        const newId = new ObjectId().toString();

        const result: InsertOneResult<any> = await collection.insertOne({ 
            name, 
            "shardkeyID": newId
        });

        if (result.acknowledged) {
            res.status(200).json({ success: true });
        } else {
            res.status(500).json({ error: 'Erro ao inserir no banco de dados' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao enviar nome.' });
    } finally {
        client.close();
    }
}
