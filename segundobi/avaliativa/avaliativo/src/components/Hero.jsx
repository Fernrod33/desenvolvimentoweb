import heroImage from '../assets/hero.png'
import './Hero.css'

const Hero = ({ stats }) => {
  return (
    <section className="hero-section section" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Plataforma completa para escalar operações</span>
          <h1>Transforme atenção em conversão com uma landing page pensada para vender.</h1>
          <p className="lead">
            Combine design premium, prova social, planos claros e um formulário funcional com envio de e-mail para
            captar leads com mais confiança.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#pricing">
              Começar agora
            </a>
            <a className="button button-secondary" href="#solutions">
              Ver soluções
            </a>
          </div>

          <ul className="hero-stats" aria-label="Principais indicadores">
            {stats.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual">
          <div className="hero-card hero-card-top">
            <span className="card-pill">Conversão ao vivo</span>
            <strong>+68%</strong>
            <p>Mais leads qualificados após ajustar narrativa, prova social e CTA.</p>
          </div>

          <div className="hero-image-shell">
            <img src={heroImage} alt="Interface moderna de uma plataforma digital" className="hero-image" />
          </div>

          <div className="hero-card hero-card-bottom">
            <span className="card-pill accent">Resposta rápida</span>
            <strong>Netlify Functions</strong>
            <p>Formulário validado com envio real de e-mail e retorno imediato ao usuário.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
