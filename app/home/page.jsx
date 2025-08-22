import React from 'react'
import HomeCarousel from './section1/page'
import CarBrandsMarquee from './section2/page'
import HowItWorks from './section3/page'
import WhyChooseUs from './section4/page'

export default function Home() {
  return (
    <div>
      <HomeCarousel></HomeCarousel>
      <CarBrandsMarquee></CarBrandsMarquee>
      <HowItWorks></HowItWorks>
      <WhyChooseUs></WhyChooseUs>
    </div>
  )
}
