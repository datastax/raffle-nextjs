import { DataAPIClient } from "@datastax/astra-db-ts";
import 'dotenv/config'

async function dump(word) {
  const db = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN).db(process.env.ASTRA_DB_API_ENDPOINT)
  const collection = await db.collection("raffle")
  const resp = await collection.find({}).toArray()
  console.log('name,email')
  console.log(resp.map(p => `${p.name},${p.email}`).join('\n'))
}

dump()