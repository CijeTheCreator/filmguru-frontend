```typescript
fetch('http://localhost:3000/app/api/user', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify({ keyword: 'menaiala' })
})

const response = await fetch('http://localhost:3000/', {
  cache: 'no-store'
})
```
