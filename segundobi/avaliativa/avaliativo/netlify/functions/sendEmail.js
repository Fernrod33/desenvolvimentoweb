
import nodemailer from 'nodemailer'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const recaptchaVerifyUrl = 'https://www.google.com/recaptcha/api/siteverify'

// Cria uma resposta HTTP padronizada com status e corpo JSON.
const createResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
})

// Faz o parse do corpo da requisicao e retorna null quando o JSON e invalido.
const parseBody = (event) => {
  if (!event.body) return {}

  try {
    return JSON.parse(event.body)
  } catch {
    return null
  }
}

// Valida os campos recebidos e devolve erros junto dos dados sanitizados.
const validatePayload = (payload) => {
  const errors = {}
  const name = String(payload?.name || '').trim()
  const email = String(payload?.email || '').trim()
  const subject = String(payload?.subject || '').trim()
  const message = String(payload?.message || '').trim()
  const captchaToken = String(payload?.captchaToken || '').trim()

  if (!name) errors.name = 'Nome Ã© obrigatÃ³rio.'
  if (!email) {
    errors.email = 'E-mail Ã© obrigatÃ³rio.'
  } else if (!emailRegex.test(email)) {
    errors.email = 'E-mail invÃ¡lido.'
  }
  if (!subject) errors.subject = 'Assunto Ã© obrigatÃ³rio.'
  if (!message) errors.message = 'Mensagem Ã© obrigatÃ³ria.'
  if (message && message.length < 10) errors.message = 'Mensagem deve ter ao menos 10 caracteres.'
  if (!captchaToken) errors.captcha = 'Confirme o reCAPTCHA.'

  return {
    errors,
    sanitized: { name, email, subject, message, captchaToken },
  }
}

// Handler principal da funcao serverless para validar e enviar o e-mail via SMTP.
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return createResponse(405, { message: 'MÃ©todo nÃ£o permitido.' })
  }

  const payload = parseBody(event)
  if (payload === null) {
    return createResponse(400, { message: 'Corpo da requisiÃ§Ã£o invÃ¡lido.' })
  }

  const { errors, sanitized } = validatePayload(payload)
  if (Object.keys(errors).length > 0) {
    return createResponse(400, {
      message: 'Preencha os campos corretamente.',
      errors,
    })
  }

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.CONTACT_TO || user
  const from = process.env.CONTACT_FROM || user

  if (!host || !user || !pass || !to || !from) {
    return createResponse(500, {
      message:
        'ConfiguraÃ§Ã£o de e-mail ausente. Defina SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO e CONTACT_FROM.',
    })
  }

  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
  if (!recaptchaSecret) {
    return createResponse(500, {
      message:
        'ConfiguraÃ§Ã£o do reCAPTCHA ausente. Defina RECAPTCHA_SECRET_KEY para validar o formulário.',
    })
  }

  const captchaResponse = await fetch(recaptchaVerifyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: recaptchaSecret,
      response: sanitized.captchaToken,
    }),
  }).then((response) => response.json())

  if (!captchaResponse.success) {
    return createResponse(400, {
      message: 'Falha na validação do reCAPTCHA. Tente novamente.',
    })
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    auth: {
      user,
      pass,
    },
  })

  try {
    await transporter.sendMail({
      from: `Aurora Contact <${from}>`,
      to,
      replyTo: sanitized.email,
      subject: `[Landing Page] ${sanitized.subject}`,
      text: `Nome: ${sanitized.name}\nE-mail: ${sanitized.email}\n\nMensagem:\n${sanitized.message}`,
      html: `
        <h2>Novo contato pela landing page</h2>
        <p><strong>Nome:</strong> ${sanitized.name}</p>
        <p><strong>E-mail:</strong> ${sanitized.email}</p>
        <p><strong>Assunto:</strong> ${sanitized.subject}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${sanitized.message.replace(/\n/g, '<br />')}</p>
      `,
    })

    return createResponse(200, {
      message: 'Mensagem enviada com sucesso.',
    })
  } catch (error) {
    return createResponse(500, {
      message: 'Falha ao enviar o e-mail.',
      error: error instanceof Error ? error.message : 'Erro desconhecido.',
    })
  }
}
