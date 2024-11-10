require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
})

async function AddPrimaryKey() {
  const result = await pool.query(
    `
    ALTER TABLE public.imdb_numbered_votes
    ADD COLUMN id SERIAL PRIMARY KEY;
      `
  )
  console.log({ message: result })
}
async function DeleteEmbeddingColumn() {
  const result = await pool.query(
    `
    ALTER TABLE public.imdb_numbered_votes DROP COLUMN embedding;
      `
  )
  console.log({ message: result })
}

async function Vectorizer() {
  try {
    await pool.query(
      `
      SELECT ai.create_vectorizer(
      'public.imdb_numbered_votes'::regclass,
      embedding=>ai.embedding_openai('text-embedding-3-small', 1536, api_key_name=>'OPENAI_API_KEY'),
      chunking=>ai.chunking_recursive_character_text_splitter('description'),
      formatting=>ai.formatting_python_template('title: $title description: $chunk, year: $year, duration: $duration, rating: $rating, stars: $stars')
      );
      `
    )
    return { status: 'success' }
  } catch (error) {
    console.log(error)
    return { status: 'failed' }
  }
}

async function EmbedQuery(query: string) {
  try {
    // Step 1: Get the embedding for the query
    const embeddingResult = await pool.query(
      `SELECT ai.openai_embed('text-embedding-3-small', $1) AS embedding`,
      [query]
    )

    const embedding = embeddingResult.rows[0].embedding

    // Step 2: Use the embedding in the main query
    const result = await pool.query(
      `
    SELECT chunk
    FROM imdb_numbered_votes_embedding_store
    ORDER BY embedding <=> $1
    LIMIT 3;
    `,
      [embedding]
    )

    const rows = result.rows
    const context = rows
      .map((value: any) => `Chunk: ${value.chunk}`)
      .join('\n\n')

    return { status: 'success', chunk: context }
  } catch (error) {
    console.log(error)
    return { status: 'failed' }
  }
}

async function GenerateFromPromptAndContext(query: string, context: string) {
  try {
    const finalPrompt = `Query: ${query}\nContext: ${context}`
    const result = await pool.query(
      `
      SELECT ai.openai_chat_complete(
      'gpt-4o-mini', 
      jsonb_build_array( 
      jsonb_build_object('role', 'system', 'content', 'you are a helpful assistant that recommends movies, based on the query and context recommend a single movie'),
      jsonb_build_object('role', 'user', 'content', $1)
      )
      )->'choices'->0->'message'->>'content';
      `,
      [finalPrompt]
    )
    return { status: 'success', result: result }
  } catch (error) {
    console.log(error)
    return { status: 'failed' }
  }
}

async function Testing() {
  const query = 'What are some Christopher Nolan movies'
  const response = await EmbedQuery(query)
  const generation = await GenerateFromPromptAndContext(query, response.chunk)
  if (generation.status == 'success') {
    console.log(generation)
    console.log('It worked out')
  } else {
    console.log('It did not work out')
  }
}
async function asyncAddPrimaryKey() {
  await AddPrimaryKey()
}

Testing()
// DeleteEmbeddingColumn();
// asyncAddPrimaryKey()
