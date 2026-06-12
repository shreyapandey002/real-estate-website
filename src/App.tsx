import './index.css'
import Header from './components/Header'
import Hero from './components/Hero'
import PropertyListings from './components/PropertyListings'
import ChatWidget from './components/ChatWidget'

function App() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <PropertyListings />
      <ChatWidget />
    </div>
  )
}

export default App
