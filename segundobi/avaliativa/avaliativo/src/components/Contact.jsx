import { useEffect, useRef, useState } from 'react'
import { sendContactMessage } from '../services/api/contact'
import './Contact.css'

const initialState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
const recaptchaScriptId = 'google-recaptcha-script'

const Contact = () => {
  const [formData, setFormData] = useState(initialState)
  const [fieldErrors, setFieldErrors] = useState({})
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [captchaToken, setCaptchaToken] = useState('')
  const captchaContainerRef = useRef(null)
  const captchaWidgetIdRef = useRef(null)

  useEffect(() => {
    if (!recaptchaSiteKey || !captchaContainerRef.current) return undefined

    let cancelled = false
    let retryTimer = null

    const renderCaptcha = () => {
      if (cancelled || !window.grecaptcha?.render || !captchaContainerRef.current) return
      if (captchaWidgetIdRef.current !== null) return

      captchaWidgetIdRef.current = window.grecaptcha.render(captchaContainerRef.current, {
        sitekey: recaptchaSiteKey,
        callback: (token) => {
          setCaptchaToken(token)
          setFieldErrors((current) => ({ ...current, captcha: undefined }))
        },
        'expired-callback': () => {
          setCaptchaToken('')
        },
        'error-callback': () => {
          setStatus({
            type: 'error',
            message: 'Não foi possível carregar o reCAPTCHA. Recarregue a página e tente novamente.',
          })
        },
      })
    }

    const ensureCaptchaReady = (attempt = 0) => {
      if (cancelled) return

      if (window.grecaptcha?.ready) {
        window.grecaptcha.ready(() => {
          if (cancelled) return
          renderCaptcha()
        })
        return
      }

      if (attempt >= 20) {
        setStatus({
          type: 'error',
          message: 'Não foi possível inicializar o reCAPTCHA. Recarregue a página e tente novamente.',
        })
        return
      }

      retryTimer = window.setTimeout(() => ensureCaptchaReady(attempt + 1), 200)
    }

    const existingScript = document.getElementById(recaptchaScriptId)

    if (existingScript) {
      if (window.grecaptcha) {
        ensureCaptchaReady()
      } else {
        existingScript.addEventListener('load', ensureCaptchaReady)
      }

      return () => {
        cancelled = true
        if (retryTimer) window.clearTimeout(retryTimer)
        existingScript.removeEventListener('load', ensureCaptchaReady)
      }
    }

    const script = document.createElement('script')
    script.id = recaptchaScriptId
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = ensureCaptchaReady
    document.head.appendChild(script)

    return () => {
      cancelled = true
      if (retryTimer) window.clearTimeout(retryTimer)
    }
  }, [])

  const validate = () => {
    const nextErrors = {}

    if (!formData.name.trim()) nextErrors.name = 'Informe o nome.'
    
    if (!formData.email.trim()) {
      nextErrors.email = 'Informe o e-mail.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Informe um e-mail válido.'
    }
    
    if (!formData.subject.trim()) nextErrors.subject = 'Informe o assunto.'
    
    if (!formData.message.trim()) nextErrors.message = 'Escreva sua mensagem.'
    if (formData.message.trim().length < 10) nextErrors.message = 'A mensagem deve ter ao menos 10 caracteres.'
    if (!captchaToken) nextErrors.captcha = 'Confirme o reCAPTCHA antes de enviar.'

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setFieldErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const nextErrors = validate()
    setFieldErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: 'error', message: 'Revise os campos destacados antes de continuar.' })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: 'loading', message: 'Enviando sua mensagem...' })

    try {
      await sendContactMessage({ ...formData, captchaToken })
      setFormData(initialState)
      setCaptchaToken('')
      if (window.grecaptcha && captchaWidgetIdRef.current !== null) {
        window.grecaptcha.reset(captchaWidgetIdRef.current)
      }
      setStatus({ type: 'success', message: 'Mensagem enviada com sucesso. Em breve entraremos em contato.' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Não foi possível enviar sua mensagem agora. Tente novamente em instantes.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section section-alt" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">Contact</span>
          <h2>Fale com a equipe e receba uma resposta rápida por e-mail.</h2>
          <p>
            O formulário possui validação no cliente e no serverless, garantindo uma experiência segura e sem ruído
            para o usuário.
          </p>

          <div className="contact-highlights">
            <div>
              <strong>Resposta imediata</strong>
              <span>Confirmação visual de sucesso ou erro.</span>
            </div>
            <div>
              <strong>Envio funcional</strong>
              <span>Integração via Netlify Functions e SMTP.</span>
            </div>
          </div>

          {recaptchaSiteKey ? null : (
            <p className="captcha-hint">
              Defina <strong>VITE_RECAPTCHA_SITE_KEY</strong> para ativar a proteção anti-spam do formulário.
            </p>
          )}
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label>
              Nome
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={fieldErrors.name ? 'has-error' : ''}
                placeholder="Seu nome"
              />
              {fieldErrors.name ? <small>{fieldErrors.name}</small> : null}
            </label>

            <label>
              E-mail
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={fieldErrors.email ? 'has-error' : ''}
                placeholder="voce@empresa.com"
              />
              {fieldErrors.email ? <small>{fieldErrors.email}</small> : null}
            </label>
          </div>

          <label>
            Assunto
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={fieldErrors.subject ? 'has-error' : ''}
              placeholder="Sobre o projeto"
            />
            {fieldErrors.subject ? <small>{fieldErrors.subject}</small> : null}
          </label>

          <label>
            Mensagem
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={fieldErrors.message ? 'has-error' : ''}
              placeholder="Conte um pouco sobre sua necessidade"
              rows="6"
            />
            {fieldErrors.message ? <small>{fieldErrors.message}</small> : null}
          </label>

          <div className="captcha-wrapper">
            <div ref={captchaContainerRef} />
            {fieldErrors.captcha ? <small>{fieldErrors.captcha}</small> : null}
          </div>

          <button type="submit" className="button button-primary form-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
          </button>

          {status.message ? (
            <p className={`form-feedback ${status.type}`} role="alert" aria-live="polite">
              {status.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}

export default Contact
