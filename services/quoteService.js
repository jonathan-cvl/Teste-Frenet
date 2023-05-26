export const createQuote = async (data) => {
  const req = await fetch('https://frontend-test.frenet.dev/v1/quote', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: data,
  })

  const response = await req.json()

  return { data: response, status: req.status }
}