import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/fireBaseConfig";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotel from "../components/Hotel";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function ViewTrip() {
  const { tripId } = useParams(); // Get trip ID from the route URL
  const [trip, setTrip] = useState(null); // Initialize state to null for better condition checks

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, "AI-TRIPS", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.error("No such document");
        toast.error("No Trip Found");
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
      toast.error("An error occurred while fetching trip details");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Conditional Rendering */}
      {trip ? (
        <>
          <InfoSection trip={trip} />
          <Hotel trip={trip} />
          <PlacesToVisit trip={trip} />
          <Footer trip={trip} />
        </>
      ) : (
        <p className="text-center text-gray-600">Loading trip details...</p>
      )}
    </div>
  );
}

export default ViewTrip;

