import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Rooms from './components/Rooms'
import Location from './components/Location'
import Footer from './components/Footer'
import WhatsAppButton from './components/ui/WhatsAppButton'

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Gallery />
        <Rooms />
        <Location />
        <Footer />
      </main>

      <WhatsAppButton />
    </>
  )
}
