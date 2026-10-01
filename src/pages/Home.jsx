import { TopBanner } from '../components/TopBanner'
import { Navbar } from '../components/Navbar'

export function Home() {
  return (
    <div>
        <TopBanner />
        <Navbar />
        <h1>Welcome to our website!</h1>
    </div>
  )
}