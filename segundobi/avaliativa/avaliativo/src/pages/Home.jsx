import Header from '../components/Header'
import Hero from '../components/Hero'
import Solutions from '../components/Solutions'
import Testimonials from '../components/Testimonials'
import PricingPlans from '../components/PricingPlans'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

const heroStats = [
  { value: '24h', label: 'para colocar no ar' },
  { value: '100%', label: 'responsivo' },
  { value: '1', label: 'fluxo de contato funcional' },
]

const Home = () => {
  return (
    <>
      <Header navItems={navItems} ctaLabel="Falar com vendas" />
      <main>
        <Hero stats={heroStats} />
        <Solutions />
        <Testimonials />
        <PricingPlans />
        <Contact />
      </main>
      <Footer navItems={navItems} />
    </>
  )
}

export default Home
