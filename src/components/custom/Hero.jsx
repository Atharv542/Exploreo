import React from 'react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'

function Hero() {
  
  return (
    <div className="flex flex-col items-center gap-6 px-4 md:px-16 lg:px-56">
    <h1 className="font-extrabold text-3xl md:text-4xl lg:text-5xl text-center mt-10 md:mt-14">
      <span className="text-[#f56551]">Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips
    </h1>
    <p className="text-lg md:text-xl text-gray-500 text-center">
      Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
    </p>
    <Link to="/createTrip">
      <Button className="px-6 py-3 text-base md:text-lg">Get Started, It's Free</Button>
    </Link>
    <img src="/Landingpage2.png" className="bg-white w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] -mt-4 md:-mt-6" />
  </div>
  )
}

export default Hero 
