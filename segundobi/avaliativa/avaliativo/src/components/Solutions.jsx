import './Solutions.css'

const solutionItems = [
  {
    title: 'Automação de captação',
    description: 'Fluxos claros de contato, CTAs consistentes e integração funcional com e-mail.',
  },
  {
    title: 'Design de alta conversão',
    description: 'Hierarquia visual, contraste e blocos informativos para guiar a decisão do usuário.',
  },
  {
    title: 'Escala pronta para campanha',
    description: 'Estrutura responsiva e modular para landing pages de produto, serviço ou sistema.',
  },
]

const SolutionIcon = ({ index }) => {
  const paths = [
    'M12 2 2 7v10l10 5 10-5V7L12 2Zm0 5 6 3v6l-6 3-6-3V10l6-3Z',
    'M4 6h16v12H4V6Zm2 2v8h12V8H6Zm2 10h8v2H8v-2Z',
    'M12 3l3.5 7.1 7.8 1.1-5.6 5.5 1.4 7.8L12 20l-7.1 3.5 1.4-7.8-5.6-5.5 7.8-1.1L12 3Z',
  ]

  return (
    <span className="solution-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d={paths[index]} />
      </svg>
    </span>
  )
}

const Solutions = () => {
  return (
    <section className="section" id="solutions">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Solutions</span>
          <h2>Soluções que reforçam valor, confiança e clareza de oferta.</h2>
          <p>
            Cada bloco foi pensado para reduzir fricção, reforçar a proposta de valor e encaminhar o visitante para a
            ação desejada.
          </p>
        </div>

        <div className="solutions-grid">
          {solutionItems.map((item, index) => (
            <article className="solution-card" key={item.title}>
              <SolutionIcon index={index} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Solutions
