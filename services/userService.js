export const getUser = async (usernameParam) => {
  const req = await fetch(
    `https://frontend-test.frenet.dev/v1/user/${usernameParam}`
  )

  const response = await req.json()

  return { data: response, status: req.status }
}

export const createUser = async (data) => {
  const req = await fetch('https://frontend-test.frenet.dev/v1/user', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: data,
  })

  const response = await req.json()

  return { data: response, status: req.status }
}

export const updateUser = async (usernameParam, data) => {
  const req = await fetch(
    `https://frontend-test.frenet.dev/v1/user/${usernameParam}`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: data,
    }
  )

  const response = await req.json()

  return { data: response, status: req.status }
}

export const deleteUser = async () => {
  const username = document.getElementById('username-delete').value

  const req = await fetch(
    `https://frontend-test.frenet.dev/v1/user/${username}`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    }
  )

  return { status: req.status }
}
