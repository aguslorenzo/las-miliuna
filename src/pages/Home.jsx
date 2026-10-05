import { TopBanner } from '../components/TopBanner'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { ExploreCategories } from '../components/ExploreCategories'
import { BestSellersSection } from '../components/BestSellersSection'
import { TrustBanner } from '../components/TrustBanner'
import { Footer } from '../components/Footer'

export function Home() {
  return (
    <div>
        <TopBanner />
        <Navbar />
        <Hero />
        <ExploreCategories />
        <BestSellersSection />
        <TrustBanner />
        <Footer />
    </div>
  )
}