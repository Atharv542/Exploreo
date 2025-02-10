import { db } from '@/service/fireBaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCard from './components/UserTripCard';

function MyTrips() {
  const [userTrip, setUserTrip] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        console.error('No user found in local storage.');
        navigate('/');
        return;
      }

      const tripsQuery = query(
        collection(db, 'AI-TRIPS'),
        where('userEmail', '==', user.email)
      );

      const querySnapshot = await getDocs(tripsQuery);

      if (querySnapshot.empty) {
        console.log('No trips found for this user.');
        return;
      }

      const trips = [];
      querySnapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        trips.push(doc.data());
      });

      setUserTrip(trips);
    } catch (error) {
      console.error('Error fetching user trips:', error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mx-72 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {userTrip.length > 0 ? (
          userTrip.map((trip, index) => <UserTripCard key={index} trip={trip} />)
        ) : (
          [1, 2, 3, 4, 5, 6].map(index => (
            <div key={index} className="h-[180px] w-full bg-slate-200 animate-pulse rounded-xl"></div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyTrips;
