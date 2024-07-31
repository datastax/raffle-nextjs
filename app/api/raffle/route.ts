import { DataAPIClient } from "@datastax/astra-db-ts";
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const json = await req.json()
    const { name, email } = json

    const doc = {
      _id: email,
      name,
      email,
      created_at: new Date().toISOString()
    }
 
    const db = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN!).db(process.env.ASTRA_DB_API_ENDPOINT!)
    const collection = await db.collection("raffle")
    const resp = await collection.insertOne(doc, { vectorize: `${name}${email}` })
    //console.log(resp)

    return NextResponse.json({ message: "OK" }, { status: 200 })
  }
