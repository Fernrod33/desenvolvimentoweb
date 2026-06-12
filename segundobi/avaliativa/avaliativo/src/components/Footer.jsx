import './Footer.css'

const Footer = ({ navItems }) => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="brand footer-brand" href="#home">
            <span className="brand-mark">A</span>
            <span>
              <strong>Aurora</strong>
              <small>Growth Suite</small>
            </span>
          </a>
          <p>
            Landing page moderna para apresentação de produto, serviço ou sistema com foco em conversão, responsividade
            e contato funcional.
          </p>
        </div>

        <div>
          <h3>Links rápidos</h3>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Institucional</h3>
          <ul>
            <li>
              <a href="#pricing">Planos</a>
            </li>
            <li>
              <a href="#contact">Contato</a>
            </li>
            <li>
              <a href="#solutions">Soluções</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Redes sociais</h3>
          <ul>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 Aurora Growth Suite. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
