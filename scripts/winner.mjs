import OpenAI from 'openai'
import 'dotenv/config'

async function run(word) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const embedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: word,
      encoding_format: "float",
    });

    const vector = embedding.data[0].embedding
    console.log(JSON.stringify(vector))
}

const randomWord = process.argv[2]

console.log(randomWord)

run(randomWord)