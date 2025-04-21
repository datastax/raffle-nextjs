import 'dotenv/config'
import { DataAPIClient } from "@datastax/astra-db-ts"
import OpenAI from 'openai'

async function run({command, arg}) {
    const db = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN).db(process.env.ASTRA_DB_API_ENDPOINT)
    const collection = await db.collection("raffle")
    const doc = {
        _id: "settings",
    }
    let resp
    switch (command) {
        case "help":
            console.log("usage: node scripts/admin.mjs command argument\n\nvalid commands include: start, stop, delete, dump, winner, truncate")
        case "start":
            doc.state = "running"
            await collection.findOneAndUpdate({_id: "settings"}, { $set: { state: "running" }}, { upsert: true })
            break;
        case "stop":
            doc.state = "stopped"
            await collection.findOneAndUpdate({_id: "settings"}, { $set: { state: "stopped" }}, { upsert: true })
            break;
        case "delete":
            await collection.deleteOne({ _id: arg })
            break;
        case "dump":
            resp = await collection.find({}).toArray()
            console.log('name,email,company, job_title')
            console.log(resp.map(p => `${p.name},${p.email},${p.company},${p.job_title}`).join('\n'))
            break;
        case "winner":
            const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
            const embedding = await openai.embeddings.create({
              model: "text-embedding-ada-002",
              input: arg,
              encoding_format: "float",
            });
            const vector = embedding.data[0].embedding
            console.log(JSON.stringify(vector))
        case "truncate":
            resp = await collection.deleteMany({})
            console.log(resp)
            break;
    }
}

const command = process.argv[2] || "help"
const arg = process.argv[3]

run({command, arg})

