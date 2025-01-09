import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from 'react'
import axios from 'axios'
import { FcGoogle } from "react-icons/fc";
import { MdExplore } from "react-icons/md";


function Header() {
  const [openDailog,setOpenDailog]=useState(false);
  const user=JSON.parse(localStorage.getItem('user'))
  useEffect(()=>{
    console.log(user);
    
  },[])

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
      window.location.reload()
    })
  }
  
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <a href='/'>
      <h1 className="font-extrabold text-3xl text-orange-500">Exploreo 🛤️</h1>
      </a>
      
      <div>
        { user?
          <div className='flex items-center gap-3'>
          <a href='createTrip'>
            <Button variant="outline" className='rounded-full'>+ Create Trip</Button>
            </a>
            <a href='/my-trips'>
            <Button variant="outline" className='rounded-full'>My Trips</Button>
            </a>
            
            
            <Popover>
              <PopoverTrigger><img src={user.picture} className='rounded-full w-[35px] h-[35px]'></img></PopoverTrigger>
              <PopoverContent><h2 className='cursor-pointer' onClick={()=>{
                googleLogout();
                localStorage.clear();
                window.location.reload();
                
              
              }}>Logout</h2></PopoverContent>
            </Popover>

          </div>:
          <Button onClick={()=>setOpenDailog(true)}>Sign In</Button>
        }
        </div>
        <Dialog open={openDailog}>
                
                    <DialogContent>
                     <DialogHeader>
                    
                   <DialogDescription>
                          <img src="/logo.svg"></img>
                          <h2 className='font-bold text-lg mt-7'>Sign with Google</h2>
                          <p>Sign in to the  with Google authentication securely</p>

                          <Button onClick={login} className="w-full m-5 flex gap-4 items-center justify-center" ><FcGoogle className='w-7 h-7'/>
                          Sign In with Google</Button>
                    </DialogDescription>
                    </DialogHeader>
                   </DialogContent>
            </Dialog>
        
    </div>
  )
}

export default Header