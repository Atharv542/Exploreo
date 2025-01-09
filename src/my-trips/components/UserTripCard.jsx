import { GetPlaceDeatails, PHOTO_REF_url } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCard({trip}) {
    const[photoURL,setPhotoURL]= useState();
          const GetPlacePhoto=async()=>{
              const data={
                textQuery:trip.userSelection.location
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
    <Link to={'/view-trip/'+ trip.id}>
          <div className='hover:scale-105 transition-all'>
        <img className=' rounded-xl object-fill h-[180px] w-full ' src={photoURL}></img>
        <div>
            <h2 className='font-bold text-lg'>{trip.userSelection.location}</h2>
            <h2 className='text-sm text-gray-500'>{trip.userSelection.noOfDays} Days with {trip.userSelection.budget} Budget</h2>
        </div>
    </div>
    </Link>
  
  )
}

export default UserTripCard