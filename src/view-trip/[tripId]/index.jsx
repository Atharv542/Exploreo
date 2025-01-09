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
  const { tripId } = useParams(); // helps to find the id generated in the url when user comes to this page
  const[trip,setTrip]=useState([]);
  useEffect(() => {
    tripId && GetTripData(); //this means when ever this view-trip page renders then getTripData function executes and it only execute whenever there is trip id.
  }, [tripId]);
  const GetTripData = async () => {
    const docRef = doc(db, "AI-TRIPS", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document");
      toast("No Trip Found");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        {/*Information Section*/}
        <InfoSection trip={trip}/>
        {/*Recommended Hotels*/}
        <Hotel trip={trip}/>
        {/*Daily Plans*/}
        <PlacesToVisit trip={trip}/>
        {/*Footer*/}
        <Footer trip={trip}/>
    </div>
  ) 
}

export default ViewTrip;
