import './Testimonials.css'

const testimonials = [
  {
    quote:
      'A estrutura da pagina tornou a proposta muito mais clara. O formulario passou a gerar leads com mais qualidade e a experiencia ficou mais profissional.',
    name: 'Mariana Souza',
    role: 'Marketing Lead',
    company: 'Nexa Labs',
    accent: 'MS',
  },
  {
    quote:
      'O layout responsivo e os planos de preco ajudaram muito a comunicar valor. Ficou com cara de produto pronto para escala.',
    name: 'Diego Alves',
    role: 'Product Manager',
    company: 'FlowOps',
    accent: 'DA',
  },
  {
    quote:
      'A integracao com Netlify Functions simplificou a captura de contatos. Validacoes e feedbacks dao seguranca ao usuario.',
    name: 'Fernanda Lima',
    role: 'Founder',
    company: 'Studio Nova',
    accent: 'FL',
  },
  {
    quote:
      'O fluxo ficou objetivo e reduziu as duvidas antes do contato. Isso aumentou a taxa de resposta logo na primeira semana.',
    name: 'Lucas Martins',
    role: 'Growth Analyst',
    company: 'Orbito',
    accent: 'LM',
  },
  {
    quote:
      'A pagina transmite confianca sem exagero visual. O equilibrio entre conteudo e performance ficou excelente.',
    name: 'Patricia Rocha',
    role: 'Brand Strategist',
    company: 'Mira Studio',
    accent: 'PR',
  },
  {
    quote:
      'Com a comunicacao mais clara, conseguimos explicar o valor do produto em poucos segundos. Isso mudou a conversa com os clientes.',
    name: 'Rafael Costa',
    role: 'Sales Director',
    company: 'Pulse One',
    accent: 'RC',
  },
  {
    quote:
      'A experiencia mobile ficou muito boa. As secoes carregam bem em qualquer tela e o usuario entende a oferta sem esforco.',
    name: 'Aline Ferreira',
    role: 'UX Designer',
    company: 'Northwave',
    accent: 'AF',
  },
  {
    quote:
      'O conjunto da pagina passa mais credibilidade e organiza melhor a jornada de conversao. Foi uma melhoria imediata.',
    name: 'Bruno Siqueira',
    role: 'Operations Lead',
    company: 'Vertex',
    accent: 'BS',
  },
]

const Testimonials = () => {
  return (
    <section className="section section-alt" id="testimonials">
      <div className="container">
        <div className="section-heading section-heading-row">
          <div>
            <span className="eyebrow">Testimonials</span>
            <h2>Depoimentos que fortalecem prova social e reduzem objecoes.</h2>
          </div>
        </div>

        <div className="testimonial-marquee" aria-label="Carrossel infinito de depoimentos">
          <div className="testimonial-track">
            <div className="testimonial-group">
              {testimonials.map((item) => (
                <article className="testimonial-card" key={item.name}>
                  <p className="testimonial-quote">"{item.quote}"</p>
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
            <div className="testimonial-group" aria-hidden="true">
              {testimonials.map((item) => (
                <article className="testimonial-card" key={`${item.name}-clone`}>
                  <p className="testimonial-quote">"{item.quote}"</p>
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
          <p className="testimonial-caption">Passe o mouse para pausar o carrossel.</p>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
