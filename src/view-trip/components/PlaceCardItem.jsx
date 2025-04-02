import { GetPlaceDeatails, PHOTO_REF_url } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({activity,bestTimeToVisit}) {
      const[photoURL,setPhotoURL]= useState();
      const GetPlacePhoto=async()=>{
          const data={
            textQuery:activity.placeName
          }
          const result=await GetPlaceDeatails(data).then(resp=>{
            console.log(resp.data.places[0].photos[3].name)
            const PhotoURL=PHOTO_REF_url.replace('{NAME}',resp.data.places[0].photos[3].name)
            setPhotoURL(PhotoURL)
          })
      }
      useEffect(()=>{
        activity&&GetPlacePhoto()
      },[activity])
  return (
    <Link 
  to={`https://www.google.com/maps/search/?api=1&query=${activity.placeName}`} 
  target="_blank"
>
  <div className="w-full">
    <h2 className="font-medium text-sm text-orange-600">
      <strong>Best Time to Visit:</strong> {bestTimeToVisit}
    </h2>
    <div className="mt-5 shadow-md border rounded-xl p-3 flex flex-col sm:flex-row gap-5 hover:scale-105 transition-all hover:shadow-lg cursor-pointer">
      <img 
        src={photoURL ? photoURL : '/placeholder.jpg'} 
        className="w-full sm:w-[250px] h-[180px] object-cover rounded-xl"
        alt="Location"
      />
      <div className="flex flex-col">
        <h3 className="text-lg font-bold">{activity.placeName}</h3>
        <p className="text-sm text-gray-400">{activity.placeDetails}</p>
        <p className="mt-2">🕙 {activity.timeToTravel}</p>
      </div>
    </div>
  </div>
</Link>

  )
}

export default PlaceCardItem
