import React,{useRef,useState,useEffect} from 'react'
import ring from '../assets/image/ring.png'
import avatar from '../assets/image/anht.jpg'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";

function Testimonisls(props){
  const listTeam = useSelector(state => state.reducerTeam.data);
    const dispatch = useDispatch();

async function getTeam() {
 const rs=await axios('/getTeam')
  dispatch({ type: "FETCH_TEAM",
 data: rs.data})
              
}

useEffect(()=>{
  getTeam()


},[])

return(
<div  className='testimonisls'>
<p  id='testimonisls-p'>Testimonials</p>
   <h2 id='testimonisls-h'>Giving Your Awesome Business Fresh Start With US</h2>
   <p id='testimonisls-p1'>This should be used to tell a story and let your users know a little more about your product or service. How can you benefit them?</p>
   <div className='testimonisls-fullbox'> 
{listTeam.map((list,index)=> (
  <div key={list._id} className='testimonisls-box'>
  <div className='testimonisls-box-content'>
   <img className='testimonisls-box-img' src={ring}></img>
  <p className='testimonisls-box-content-p'>{list.description}</p>
</div>
<img className='testimonisls-box-avatar' src={list.avatar}></img>
<p className='testimonisls-box-name'>{list.name}</p>
<p className='testimonisls-box-regency'>{list.position}</p>
</div>
    ))}
    </div>
</div>
)
}
export default Testimonisls