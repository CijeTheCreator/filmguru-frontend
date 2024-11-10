export async function GET() {
  try {
    const query = 'What are some Christopher Nolan movies'
    const response = await fetch('http://localhost:3000/embedQuery', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ query }),
      cache: 'no-store'
    })
    const embedding = await response.json()
    console.log('response: ', embedding)
    return Response.json({ message: embedding })
  } catch (error) {
    console.error('Something went wrong:', error)
    return Response.json({ message: error })
  }
}
