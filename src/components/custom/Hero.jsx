import React from 'react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'

function Hero() {
  
  return (
    <div className='flex flex-col items-center  gap-9 mx-56 '>
        <h1 className='font-extrabold text-[50px] text-center mt-16'><span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span>Personalized Itineraries at Your Fingertips </h1>
        <p className='text-xl text-gray-500 text-center  '>Your personal trip planner and travel curator,creating custom itineraries tailored to your interests and budget</p>
        <Link to={'/createTrip'}>
            <Button>Get Started,It's free</Button>
        </Link>
        <img src='/Landingpage2.png'  className='bg-white -mt-8'></img>
        
    </div>
  )
}

export default Hero 