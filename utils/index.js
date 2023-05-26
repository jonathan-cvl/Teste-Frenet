const convertCurrency = (currency) => {
  const newCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(currency)

  return newCurrency
}

export const handleMessage = (messageHTML, display, message) => {
  messageHTML.style.display = display

  if (message) {
    messageHTML.innerHTML = message
  }
}

export const showQuotations = (divQuotations, quotations) => {
  quotations.map((quotation) => {
    const htmlQuotation = `<div class="quotation">
          <div class="p-3 border-bottom shippingServiceCode">
            <span class="fw-semibold">Código de serviço de envio: </span>
            ${quotation.shippingServiceCode}
          </div>
          <div class="p-3 border-bottom shippingServiceName">
            <span class="fw-semibold">Nome do serviço de envio: </span>
            ${quotation.shippingServiceName}
          </div>
          <div class="p-3 border-bottom platformShippingPrice">
            <span class="fw-semibold">Preço de envio da plataforma: </span>
            ${convertCurrency(quotation.platformShippingPrice)}
          </div>
          <div class="p-3 border-bottom deliveryTime">
            <span class="fw-semibold">Prazo de entrega: </span>
            ${
              quotation.deliveryTime > 1
                ? quotation.deliveryTime + ' dias'
                : quotation.deliveryTime + ' dia'
            }
          </div>
          <div class="p-3 border-bottom carrier">
            <span class="fw-semibold">Operador: </span>
            ${quotation.carrier}
          </div>
          <div class="p-3 border-bottom carrierCode">
            <span class="fw-semibold">Código da operadora: </span>
            ${quotation.carrierCode}
          </div>
          <div class="p-3 border-bottom shippingPrice">
            <span class="fw-semibold">Preço de envio: </span>
            ${
              quotation.shippingPrice
                ? quotation.shippingPrice
                : 'Não informado'
            }
          </div>
          <div class="p-3 border-bottom shippingCompetitorPrice">
            <span class="fw-semibold">Preço do frete dos Concorrentes: </span>
            ${convertCurrency(quotation.shippingCompetitorPrice)}
          </div>
          <div class="p-3 services">
            <span class="fw-semibold">Serviços</span>
            <div class="py-3 border-bottom declaredValue">
              <span class="fw-semibold">Valor declarado: </span>
              ${quotation.services.declaredValue ? 'Sim' : 'Não'}
            </div>
            <div class="py-3 border-bottom receiptNotification">
              <span class="fw-semibold">Notificação de recebimento: </span>
              ${quotation.services.receiptNotification ? 'Sim' : 'Não'}
            </div>
            <div class="py-3 ownHand">
              <span class="fw-semibold">Própria mão: </span>
              ${quotation.services.ownHand ? 'Sim' : 'Não'}
            </div>
          </div>
        </div>`

    divQuotations.innerHTML += `
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${quotation.shippingServiceCode}"
          aria-controls="collapse${quotation.shippingServiceCode}">
            ${quotation.shippingServiceName} - #${quotation.shippingServiceCode} 
          </button>
        </h2>
        <div id="collapse${quotation.shippingServiceCode}" class="accordion-collapse collapse" data-bs-parent="#accordionQuotations">
          ${htmlQuotation}
        </div>
      </div>`
  })
}
