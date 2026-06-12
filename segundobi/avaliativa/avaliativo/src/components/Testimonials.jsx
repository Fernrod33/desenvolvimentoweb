import { useRef } from 'react'
import './Testimonials.css'

const testimonials = [
  {
    quote:
      'A estrutura da página tornou a proposta muito mais clara. O formulário passou a gerar leads com qualidade e a experiência ficou mais profissional.',
    name: 'Mariana Souza',
    role: 'Marketing Lead',
    company: 'Nexa Labs',
    accent: 'MS',
  },
  {
    quote:
      'O layout responsivo e os planos de preço ajudaram muito a comunicar valor. Ficou com cara de produto pronto para escala.',
    name: 'Diego Alves',
    role: 'Product Manager',
    company: 'FlowOps',
    accent: 'DA',
  },
  {
    quote:
      'A integração com Netlify Functions simplificou a captura de contatos. Validações e feedbacks dão segurança ao usuário.',
    name: 'Fernanda Lima',
    role: 'Founder',
    company: 'Studio Nova',
    accent: 'FL',
  },
]

const Testimonials = () => {
  const trackRef = useRef(null)

  const scroll = (direction) => {
    if (!trackRef.current) return
    const amount = direction === 'next' ? 360 : -360
    trackRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="section section-alt" id="testimonials">
      <div className="container">
        <div className="section-heading section-heading-row">
          <div>
            <span className="eyebrow">Testimonials</span>
            <h2>Depoimentos que fortalecem prova social e reduzem objeções.</h2>
          </div>
          <div className="carousel-controls">
            <button type="button" className="icon-button" onClick={() => scroll('prev')} aria-label="Depoimento anterior">
              ←
            </button>
            <button type="button" className="icon-button" onClick={() => scroll('next')} aria-label="Próximo depoimento">
              →
            </button>
          </div>
        </div>

        <div className="testimonial-track" ref={trackRef}>
          {testimonials.map((item) => (
            <article className="testimonial-card" key={item.name}>
              <p className="testimonial-quote">“{item.quote}”</p>
              <div className="testimonial-profile">
                <span className="avatar">{item.accent}</span>
                <div>
                  <strong>{item.name}</strong>
                  <span>
                    {item.role} • {item.company}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
