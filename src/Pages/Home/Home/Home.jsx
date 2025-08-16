import React from 'react'
import { Helmet } from 'react-helmet-async'
import Banner from '../Banner/Banner'
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs'
import About from '../About/About'
import SpecialOffers from '../SpecialOffers/SpecialOffers'
import VisitUs from '../VisitUs/VisitUs'
import MembershipSection from '../About/MembershipSection'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Elite Sports Club</title>
        <meta name="description" content="Welcome to Elite Sports Club — where health meets community. Explore our courts, special offers, and more!" />
      </Helmet>

      <div>
        <Banner />
        <WhyChooseUs />
        <About />
        <SpecialOffers />
        <VisitUs />
        <MembershipSection />
      </div>
    </>
  )
}

export default Home
