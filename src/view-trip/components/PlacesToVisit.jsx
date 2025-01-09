import React from 'react';
import { Link } from 'react-router-dom';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  // Check if trip and itinerary exist
  const itinerary = trip?.tripData?.travelPlan?.itinerary;

  if (!itinerary || typeof itinerary !== 'object') {
    return <p>No itinerary available.</p>;
  }

  // Convert Map to array if it's a Map
  const sortedDays = Object.entries(itinerary).sort(([dayA], [dayB]) => {
    const numA = parseInt(dayA.replace('day', '')); // Extract number from 'day1'
    const numB = parseInt(dayB.replace('day', '')); // Extract number from 'day2'
    return numA - numB; // Sort by day number
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Places to Visit</h1>
      {sortedDays.map(([day, dayData], dayIndex) =>{
        const theme = dayData.theme || 'No theme available';
        const bestTimeToVisit = dayData.bestTimeToVisit || 'Not specified';
        // Extract activities from the day's data
        const activities = dayData.activities || [];

        return (
          <div key={dayIndex} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{day.toUpperCase()}</h2>
            <div className='grid md:grid-cols-2 gap-5'>
            {activities.map((activityMap, index) => {
              // Convert activity Map to Object
              const activity = activityMap instanceof Map 
                ? Object.fromEntries(activityMap) 
                : activityMap; // If activity is not a Map but an object

              return (
                <PlaceCardItem activity={activity} bestTimeToVisit={bestTimeToVisit}/>
                
              );
            })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PlacesToVisit;
