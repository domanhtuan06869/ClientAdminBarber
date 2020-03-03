import React,{useRef,useState,useEffect} from 'react'
import BoxHeader from '../components/BoxHeader'
import backgr from '../assets/image/header.png'
import close from '../assets/image/close.png'
import axios from 'axios'
import Modal from 'react-modal';
import { BrowserRouter, Route, Link,useParams } from "react-router-dom";

const customStyles = {
    content : {
      width                 : '70%',
      height                : '70%',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      opacity: '80%',
      background:'linear-gradient(90deg, rgba(41,37,105,1) 0%, rgba(22,21,117,1) 33%, rgba(15,85,158,1) 65%, rgba(10,137,163,1) 100%)',
    }
  };
function Header(props){
   const[showModal,setShowModal]=useState(false)
   const [intro,setIntro]=useState('')

 function openModal() {
    setShowModal(true)
  }
 
 function afterOpenModal() {

  }
 
 function closeModal() {
    setShowModal(false)
  }
 async function getIntro(){
     const result = await axios('/getIntroduction')
     setIntro(result.data.content)

 }
 useEffect(()=>{
     getIntro()
 },[])

let {id}=useParams()

return(
<div  className='header'>
<Modal      
        closeTimeoutMS={1000}
          isOpen={showModal}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          
          <img className='mdclose' src={close} style={{float:'right'}} onClick={()=>closeModal()}></img>
         <p style={{textAlign:'justify',color:'white',marginTop:'6%'}}>{intro}</p>
       
        </Modal>

    <img style={{width:'100%'}} src={backgr}></img>
<button onClick={()=>openModal()}  className='btn-xemthem'>Xem thêm</button>
<BoxHeader sc={props.sc} scb={props.scb} scproject={props.scproject} ></BoxHeader>
</div>
)
}
export default Header