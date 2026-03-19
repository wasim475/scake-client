import React from 'react'
import HeroSection from './Hero'
import BestSellers from './BestSeller'
import Categories from './Categories'
import OfferBanner from './Offer'
import Reviews from './Review'
import NewArrivals from './NewArrivals'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <Categories/>
      <BestSellers/>
      <NewArrivals/>
      <OfferBanner/>
      <Reviews/>
    </div>
  )
}

export default Home
