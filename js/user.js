import { deleteUser, getUser, updateUser } from '../services/userService.js'
import { handleMessage } from '../utils/index.js'
const urlBase = window.location.origin
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const isUpdated = urlParams.get('isUpdated')
const usernameParam = urlParams.get('username')
const formUpdateUser = document.getElementById('form-update-user')
const messageError = document.getElementById('message-error')
const messageSuccess = document.getElementById('message-success')
const btnDeleteUser = document.getElementById('btn-delete-user')

const load = async () => {
  handleMessage(messageSuccess, 'none')
  handleMessage(messageError, 'none')

  if (isUpdated) {
    handleMessage(messageSuccess, 'block', 'Usuário alterado com sucesso!')

    setTimeout(() => {
      handleMessage(messageSuccess, 'none', '')
    }, 3000)
  }

  if (!usernameParam) {
    handleMessage(messageError, 'block', 'Informe um usuário!')
    formUpdateUser.style.display = 'none'

    return
  }

  const response = await getUser(usernameParam)

  if (response.status !== 200) {
    handleMessage(messageError, 'block', 'Usuário não encontrado!')
    formUpdateUser.style.display = 'none'

    return
  }

  const { username, firstName, lastName, email, password, phone } =
    response.data

  document.getElementById('username').value = username
  document.getElementById('username-delete').value = username
  document.getElementById('first-name').value = firstName
  document.getElementById('last-name').value = lastName
  document.getElementById('email').value = email
  document.getElementById('phone').value = phone
  document.getElementById('password').value = password
}

btnDeleteUser.addEventListener('click', async () => {
  if (confirm('Deseja realmente deletar esse usuário?!')) {
    const response = await deleteUser()
    if (response.status == 200) {
      handleMessage(
        messageSuccess,
        'block',
        'Usuário excluido com sucesso, você será redirecionado para a tela inicial!'
      )

      setTimeout(() => {
        window.location.href = urlBase
      }, 2000)
    }
  }
})

formUpdateUser.addEventListener('submit', async (event) => {
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

  const response = await updateUser(usernameParam, JSON.stringify(data))
  if (response.status == 200) {
    window.location.href = `${urlBase}/usuario.html?username=${response.data.username}&isUpdated=1`
  }
})

load()
