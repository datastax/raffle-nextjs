import { DataAPIClient } from "@datastax/astra-db-ts";
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const json = await req.json()
    const { name, email, company } = json
    const randomVector = Array.from(Array(1536), () => (Math.random() * 2) - 1)
    console.log(randomVector)
    const db = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN!).db(process.env.ASTRA_DB_API_ENDPOINT!)
    const collection = await db.collection("raffle")
    const settings = await collection.findOne({ _id: "settings" })
    if (settings && settings.state === "running") {
      const doc = {
        name,
        email,
        company,
        $vector: randomVector,
        created_at: new Date().toISOString()
      }
   
      await collection.findOneAndUpdate({ _id: email }, { $set: doc }, { upsert: true, returnDocument: "after" })
      return NextResponse.json({ message: "OK" }, { status: 200 })
    }
    else {
      return NextResponse.json({ message: "denied" }, { status: 200 })
    }
  }
