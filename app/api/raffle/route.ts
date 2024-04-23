import { DataAPIClient } from "@datastax/astra-db-ts";
import OpenAI from "openai";
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const json = await req.json()
    const { name, email } = json

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: name+email,
      encoding_format: "float",
    });

    const vector = embedding.data[0].embedding

    const doc = {
      _id: email,
      name,
      email
    }

    console.log(doc)
 
    const db = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN!).db(process.env.ASTRA_DB_API_ENDPOINT!)
    const collection = await db.collection("raffle")
    const resp = await collection.insertOne(doc, { vector })
    console.log(resp)

    return NextResponse.json({ message: "OK" }, { status: 200 })
  }
