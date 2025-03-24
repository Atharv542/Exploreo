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
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mx-72 mt-10'>
        <h2 className=' text-3xl font-bold'>Tell us your travel preferences🌴🏕️</h2>
        <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information,and our trip planner will generate a customized itinerary based on your preferences.</p>
        <div className='mt-20 flex flex-col gap-10'>
            <div className=''>
                <h2 className='font-md text-xl my-3'>What is destination of choice?</h2>
                <ReactGoogleAutocomplete className='w-11/12 py-2 border border-gray-200 rounded-md'
                    placeholder={'Select'}
                    apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                    onPlaceSelected={handlePlaceSelected} 
                    
                    
                      
                />
                {/*<input
                      type="text"
                      value={place}
                      onChange={(e) => {
                      setPlace(e.target.value); // Update place
                      handleInputChange('location', e.target.value); // Update formData dynamically
                      }}
                      placeholder="Search location"
                       />*/}
            </div>
            <div>
            <h2 className='font-md text-xl my-3'>How many days are you planning your trip?</h2>
            <Input placeholder={'Ex.3'} type='number' className='w-11/12  rounded-md'
                 onChange={(e)=>handleInputChange('noOfDays',e.target.value)} />
            </div>
            <div>
            <h2 className='font-md text-xl my-3'>What is your budget?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item,index)=>(
                <div key={index} onClick={()=>handleInputChange('budget',item.title)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget==item.title&&'shadow-lg border-black'} `}>
                   <h2 className='text-4xl'>{item.icon}</h2>
                   <h2 className='font-bold text-lg'>{item.title}</h2>
                   <h2 className='tex-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))}
            </div>
            </div>

            <div>
            <h2 className='font-md text-xl my-3'>Who do you plan on travelling with on your next adventure?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectTravelesList.map((item,index)=>(
                <div key={index} onClick={()=>handleInputChange('traveler',item.people)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler==item.people&&'shadow-lg border-black'} `}>
                   <h2 className='text-4xl'>{item.icon}</h2>
                   <h2 className='font-bold text-lg'>{item.title}</h2>
                   <h2 className='tex-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))}
            </div>
            <div className='my-10 justify-end flex '>
              <Button onClick={OnGenerateTrip} disabled={loading}>
               {loading?<AiOutlineLoading3Quarters className='w-7 h-7 animate-spin'/>:" Generate Trip"}
              </Button>
            </div>

            <Dialog open={openDailog}>
                
                    <DialogContent>
                     <DialogHeader>
                    
                   <DialogDescription>
                          <h1 className="font-extrabold text-3xl text-orange-500">Exploreo 🛤️</h1>
                          <h2 className='font-bold text-lg mt-7'>Sign in with Google</h2>
                          <p>Sign in to the  with Google authentication securely</p>

                          <Button onClick={login} className="w-full m-5 flex gap-4 items-center justify-center" ><FcGoogle className='w-7 h-7'/>
                          Sign In with Google</Button>
                    </DialogDescription>
                    </DialogHeader>
                   </DialogContent>
            </Dialog>

            
            </div>


        </div>
    </div>
  )
}

export default CreateTrip
