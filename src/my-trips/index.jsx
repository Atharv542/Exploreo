import { db } from '@/service/fireBaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripCard from './components/UserTripCard';

function MyTrips() {
    const[userTrip,setUserTrip]=useState([]);
    useEffect(()=>{
        GetUserTrips();
    },[])
    const navigate=useNavigate();
    
    const GetUserTrips=async()=>{ //use to get users' all trips
        const user=JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigate('/');
            return;
        }
        
        const q=query(collection(db,'AI-TRIPS'),where('userEmail','==',user.email))
        const querySnapshot = await getDocs(q);
            setUserTrip([]);
            querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserTrip(prevValue=>[...prevValue,doc.data()])
    });

    };
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mx-72 mt-10'>
        <h2 className='font-bold text-3xl'>My Trips</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
            {userTrip.length>0?userTrip.map((trip,index)=>(
                <UserTripCard trip={trip} />
            )):[1,2,3,4,5,6].map((item,index)=>(
                <div key={index} className='h-[180px] w-full bg-slate-200 animate-pulse rounded-xl'>

                </div>
            ))
            }
        </div>
    </div>
  )
}

export default MyTrips