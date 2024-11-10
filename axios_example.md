```typescript
import axios from 'axios'

interface PostResponse {
  id: number
  success: boolean
}

export async function GET(request: Request) {
  try {
    const response = await axios.post('https://api.example.com/data', {
      message: 'Hello'
    })
    return Response.json({ message: response })
  } catch (error) {
    console.error('Error sending data:', error)
    throw error
  }
}
```
