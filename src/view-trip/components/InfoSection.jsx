import { Button } from '@/components/ui/button'
import { GetPlaceDeatails, PHOTO_REF_url } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";

function InfoSection({trip}) {
  const[photoURL,setPhotoURL]= useState();
  const GetPlacePhoto=async()=>{
      const data={
        textQuery:trip?.userSelection?.location
      }
      const result=await GetPlaceDeatails(data).then(resp=>{
        console.log(resp.data.places[0].photos[3].name)
        const PhotoURL=PHOTO_REF_url.replace('{NAME}',resp.data.places[0].photos[3].name)
        setPhotoURL(PhotoURL)
      })
  }
  useEffect(()=>{
    trip&&GetPlacePhoto()
  },[trip])
  
  return (
    
    <div>
        <img src={photoURL} className='w-full h-[550px]  rounded-xl'></img>
        <div className='flex justify-between items-center'>
        
        <div className='flex flex-col gap-2  my-5'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
            <div className='flex gap-5'>
                <h2 className='px-3 bg-gray-200 rounded-full text-gray-500 p-1 text-xs md:text-md '>📅 {trip?.userSelection?.noOfDays} Day</h2>
                <h2 className='px-3 bg-gray-200 rounded-full text-gray-500 p-1 text-xs md:text-md  '>💰 {trip?.userSelection?.budget} Budget</h2>
                <h2 className='px-3 bg-gray-200 rounded-full text-gray-500 p-1 text-xs md:text-md  '>🍻 No. of Traveler:{trip?.userSelection?.traveler}</h2>
            </div>
        </div>
        <Button><IoIosSend/></Button>
    </div>
    </div>
  )
}

export default InfoSection