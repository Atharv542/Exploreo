import { GetPlaceDeatails, PHOTO_REF_url } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({hotel}) {
    const[photoURL,setPhotoURL]= useState();
      const GetPlacePhoto=async()=>{
          const data={
            textQuery:hotel.hotelName
          }
          const result=await GetPlaceDeatails(data).then(resp=>{
            console.log(resp.data.places[0].photos[3].name)
            const PhotoURL=PHOTO_REF_url.replace('{NAME}',resp.data.places[0].photos[3].name)
            setPhotoURL(PhotoURL)
          })
      }
      useEffect(()=>{
        hotel&&GetPlacePhoto()
      },[hotel])
  return (
    <div>
         <Link to={'https://www.google.com/maps/search/?api=1&query='+ hotel.hotelName + ","+ hotel.hotelAddress} target='_blank'>
                <div className='hover:scale-105 transition-all cursor-pointer mt-3'>
                    <img src={photoURL?photoURL:'/placeholde.jpg'} className='rounded-xl h-[180px] w-full object-cover'/>
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium'>{hotel.hotelName}</h2>
                        <h2  className='text-xs text-gray-500'>📍 {hotel.hotelAddress}</h2>
                        <h2 className='text-sm'>💰 {hotel.price}</h2>
                        
                    </div>
                </div>
                </Link>
    </div>
  )
}

export default HotelCardItem