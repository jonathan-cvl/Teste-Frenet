import { createQuote } from '../services/quoteService.js'
import { showQuotations } from '../utils/index.js'

const divQuotations = document.getElementById('accordionQuotations')
const formQuote = document.getElementById('form-quote')

formQuote.addEventListener('submit', async (event) => {
  event.preventDefault()

  const zipCodeSource = document.getElementById('cep-source').value
  const zipCodeDestination = document.getElementById('cep-destination').value
  const weight = document.getElementById('weight').value
  const width = document.getElementById('width').value
  const height = document.getElementById('height').value
  const length = document.getElementById('length').value
  const dimension = {
    width,
    height,
    length,
  }

  const data = {
    zipCodeSource,
    zipCodeDestination,
    weight,
    dimension,
  }

  const response = await createQuote(JSON.stringify(data))

  if (response.status == 200) {
    divQuotations.style.display = 'block'
    formQuote.reset()
    showQuotations(divQuotations, response.data.quotations)
  }
})
