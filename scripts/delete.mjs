import 'dotenv/config'
import { DataAPIClient } from "@datastax/astra-db-ts";

async function run({_id}) {
    const db = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN).db(process.env.ASTRA_DB_API_ENDPOINT)
    const collection = await db.collection("raffle")
    const resp = await collection.deleteOne({_id})
    console.log(resp)
}

const _id = process.argv[2]

run({_id})
