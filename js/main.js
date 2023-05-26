import { createUser } from '../services/UserService.js'
import { handleMessage } from '../utils/index.js'
const urlBase = window.location.origin
const messageSuccess = document.getElementById('message-success')
const formCadUser = document.getElementById('form-cad-user')

messageSuccess.style.display = 'none'

formCadUser.addEventListener('submit', async (event) => {
  event.preventDefault()

  const username = document.getElementById('username').value
  const firstName = document.getElementById('first-name').value
  const lastName = document.getElementById('last-name').value
  const email = document.getElementById('email').value
  const phone = document.getElementById('phone').value
  const password = document.getElementById('password').value

  const data = {
    username,
    firstName,
    lastName,
    email,
    password,
    phone,
    userStatus: 2,
  }

  const response = await createUser(JSON.stringify(data))
  if (response.status == 200) {
    handleMessage(
      messageSuccess,
      'block',
      'Usuário criado com sucesso, você será redirecionado para tela de dados do usuário!'
    )

    setTimeout(() => {
      window.location.href = `${urlBase}/usuario.html?username=${username}`
    }, 4000)
  }
})
