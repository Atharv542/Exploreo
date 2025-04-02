import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useState } from 'react'
import ReactGoogleAutocomplete from 'react-google-autocomplete'
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/fireBaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';



function CreateTrip() {
  const [place,setPlace]=useState();
  const [formData, setFormData] = useState({
    location: '',
    noOfDays: '',
    budget: '',
    traveler: ''
  });
  const [openDailog,setOpenDailog]=useState(false);
  const[loading,setLoading]=useState(false);
  const navigate=useNavigate();

  const handleInputChange=(name,value)=>{
      
      

       setFormData({
        ...formData,
        [name]:value
       })
  }
  const handlePlaceSelected = (place) => {
    const address = place.formatted_address || '';
    setPlace(address);

    // Update form data using the callback
    handleInputChange('location', address);

    console.log('Selected Place:', place);
  };
   
 
  const OnGenerateTrip=async()=>{
        const user=localStorage.getItem('user');
        if(!user){
          setOpenDailog(true);
          return;
        }
        const { location, noOfDays, budget, traveler } = formData;
        if (!location  || noOfDays>6 || !budget || !traveler) {

          toast("Please fill all details");

          return;
        
        }
        
        setLoading(true);
        
        const FINAL_PROMPT=AI_PROMPT
        .replace('{location}',location)
        .replace('{totalDays}',noOfDays)
        .replace('{traveler}',traveler)
        .replace('{budget}',budget)
        .replace('{totalDays}',noOfDays)

        //console.log(FINAL_PROMPT);

        const result=await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());
        setLoading(false);
        SaveAiTrip(result?.response?.text());

  }
  const SaveAiTrip=async(TripData)=>{
    setLoading(true);
    const user=JSON.parse(localStorage.getItem('user'));
    const docID=Date.now().toString()
    await setDoc(doc(db, "AI-TRIPS",  docID), {
      userSelection:formData,
      tripData:JSON.parse(TripData),
      userEmail:user?.email,
      id:docID

    });
    setLoading(false);
    navigate('/view-trip/'+docID)
  }
  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })
  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDailog(false);
      OnGenerateTrip();
    })
  }
  return (
    <div className='px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 mx-auto max-w-5xl mt-10'>
    <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center'>Tell us your travel preferences 🌴🏕️</h2>
    <p className='mt-3 text-gray-500 text-sm sm:text-base md:text-lg text-center'>
        Provide some basic information, and our trip planner will generate a customized itinerary for you.
    </p>
    <div className='mt-10 flex flex-col gap-6'>
        <div>
            <h2 className='font-medium text-lg sm:text-xl my-2'>Destination of choice?</h2>
            <ReactGoogleAutocomplete 
                className='w-full py-2 border border-gray-300 rounded-md px-3' 
                placeholder='Select' 
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY} 
                onPlaceSelected={(place) => handleInputChange('location', place)} 
            />
        </div>
        <div>
            <h2 className='font-medium text-lg sm:text-xl my-2'>How many days are you planning?</h2>
            <Input 
                type='number' 
                placeholder='Ex. 3' 
                className='w-full rounded-md border border-gray-300 py-2 px-3' 
                onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            />
        </div>
        <div>
            <h2 className='font-medium text-lg sm:text-xl my-2'>What is your budget?</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                {SelectBudgetOptions.map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleInputChange('budget', item.title)} 
                        className={`p-4 border cursor-pointer rounded-lg hover:shadow-md text-center ${formData?.budget === item.title ? 'shadow-md border-black' : ''}`}>
                        <h2 className='text-3xl'>{item.icon}</h2>
                        <h2 className='font-bold text-base sm:text-lg'>{item.title}</h2>
                        <p className='text-xs sm:text-sm text-gray-500'>{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
        <div>
            <h2 className='font-medium text-lg sm:text-xl my-2'>Who are you traveling with?</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                {SelectTravelesList.map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleInputChange('traveler', item.people)} 
                        className={`p-4 border cursor-pointer rounded-lg hover:shadow-md text-center ${formData?.traveler === item.people ? 'shadow-md border-black' : ''}`}>
                        <h2 className='text-3xl'>{item.icon}</h2>
                        <h2 className='font-bold text-base sm:text-lg'>{item.title}</h2>
                        <p className='text-xs sm:text-sm text-gray-500'>{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className='flex justify-center mt-8'>
            <Button onClick={OnGenerateTrip} disabled={loading} className='px-6 py-2 text-lg'>
                {loading ? <AiOutlineLoading3Quarters className='animate-spin w-5 h-5' /> : 'Generate Trip'}
            </Button>
        </div>
    </div>
    <Dialog open={openDailog}>
        <DialogContent>
            <DialogHeader>
                <DialogDescription>
                    <h1 className='font-extrabold text-3xl text-orange-500 text-center'>Exploreo 🛤️</h1>
                    <h2 className='font-bold text-lg mt-5 text-center'>Sign in with Google</h2>
                    <p className='text-center text-gray-600'>Sign in securely with Google authentication.</p>
                    <div className='flex justify-center mt-5'>
                        <Button onClick={() => {}} className='w-full flex gap-4 items-center justify-center'>
                            <FcGoogle className='w-6 h-6' /> Sign In with Google
                        </Button>
                    </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
</div>
  )
}

export default CreateTrip
