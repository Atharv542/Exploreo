import { BiSolidPlaneAlt } from "react-icons/bi";
import { PiCheersFill } from "react-icons/pi";
import { MdFamilyRestroom } from "react-icons/md";
import { GiThreeFriends } from "react-icons/gi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { SiCashapp } from "react-icons/si";
import { RiMoneyPoundCircleFill } from "react-icons/ri";

export const SelectTravelesList=[
    
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:'🛫',
        people:'1',
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'👫',
        people:'2 People',
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'👪',
        people:'3 to 5 People',
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'🍻',
        people:'5 to 10 People',
    }

]

export const SelectBudgetOptions=[
    {
        id:'1',
        title:'Cheap',
        desc:'Stay concious of costs',
        icon:'💸'
    },
    {
        id:'2',
        title:'Moderate',
        desc:'Keep cost on moderate side',
        icon:'💰'
    },
    {
        id:'3',
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💲'
    },

]

export const AI_PROMPT="Generate travel plan for {location},for {totalDays} days for {traveler} with a {budget} budget, give me a hotels options list with HotelName,Hotel address, Price,Hotel image url, Geo Coordinates,rating description and suggest itenerary with placeName,Place details,Place image url,Geo coordinates,ticket pricing,rating,time to  travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format "