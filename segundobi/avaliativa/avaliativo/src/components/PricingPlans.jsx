import './PricingPlans.css'

const pricingPlans = [
  {
    name: 'Starter',
    price: 'R$ 49',
    period: '/mês',
    description: 'Para validar uma oferta com uma estrutura enxuta.',
    features: ['1 landing page', 'Formulário funcional', 'Integração básica', 'Suporte por e-mail'],
    cta: 'Testar agora',
  },
  {
    name: 'Growth',
    price: 'R$ 129',
    period: '/mês',
    description: 'Recomendado para campanhas em andamento e geração de leads consistente.',
    features: ['Tudo do Starter', 'Seções extras', 'Ajustes de conversão', 'Depoimentos e prova social'],
    cta: 'Contratar plano',
    featured: true,
  },
  {
    name: 'Scale',
    price: 'R$ 249',
    period: '/mês',
    description: 'Ideal para equipes que precisam de volume, refinamento e evolução contínua.',
    features: ['Tudo do Growth', 'Customização avançada', 'Prioridade no suporte', 'Acompanhamento estratégico'],
    cta: 'Falar com especialista',
  },
]

const PricingPlans = () => {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Pricing Plans</span>
          <h2>Planos claros para facilitar a decisão e acelerar a contratação.</h2>
          <p>Os pacotes seguem uma lógica simples: entrada acessível, opção recomendada e alternativa para escala.</p>
        </div>

        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article className={`pricing-card ${plan.featured ? 'featured' : ''}`} key={plan.name}>
              {plan.featured ? <span className="featured-badge">Mais recomendado</span> : null}
              
              <h3>{plan.name}</h3>
              
              <div className="pricing-value">
                <strong>{plan.price}</strong>
                <span>{plan.period}</span>
              </div>
              
              <p>{plan.description}</p>
              
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              
              <a className={`button ${plan.featured ? 'button-primary' : 'button-secondary'}`} href="#contact">
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingPlans
