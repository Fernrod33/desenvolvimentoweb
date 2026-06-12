export const sendContactMessage = async (payload) => {
  const response = await fetch('/.netlify/functions/sendEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Falha ao enviar a mensagem.')
  }

  return data
}
