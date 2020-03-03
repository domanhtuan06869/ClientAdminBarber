import React,{useRef,useState} from 'react'
import BoxHeader from '../components/BoxHeader'
import { Button ,Input} from 'reactstrap';
import axios from 'axios'

import Swal from "sweetalert2"; 
 

function Boxfrom(props){

const [showalert,setShowalert]=useState()
const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [number,setNumber]=useState('')
const [checkPhone,setCheckPhone]=useState(null)
const [checkName,setCheckName]=useState(null)
const [checkEmail,setCheckEmail]=useState(null)

function swal(){
    Swal.fire({  
        title: 'Thành công',  
        type: 'success',  
        text: 'Chúng tôi sẽ liên hệ lại cho bạn',  
    }); 
}
async function postContact(){
    let postData={
        name:name,
        email:email,
        number:number
    }
    let axiosConfig = {
        headers: {
          'Content-Type' : 'application/json; charset=UTF-8',   
        }
      };
     await axios({
        method: 'post',
       url: '/postContact' ,
       headers: axiosConfig,
       data:postData
   }).then((res)=>{
        setCheckName(null)
        setCheckEmail(null)
        setCheckPhone(null)
        setEmail('')
        setName('')
        setNumber('')
        swal()
         
   })
}
async function checkValidate(){
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    var phone = vnf_regex.test(number)
    var checkemail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    if(name==''){setCheckName('không để trống tên')}
    if(email==''){setCheckEmail('không để trống email')}
    if(number==''){setCheckPhone('không để trống số điện thoại')}
    if(name!=''){setCheckName(null)}
    if(email!=''){setCheckEmail(null)}
    if(number!=''){setCheckPhone(null)}
    if(name==''||email==''||number==''){    
    }else if(checkemail==false){
        setCheckEmail('Email viết chưa đúng kiểu')
    }else if(phone==false){
        setCheckPhone('Số điện thoại chưa đúng kiểu')
    }else{
      postContact()

    }
}
return(
<div ref={props.refs} className='box-form'>

    <p style={{color:'gray'}}>Start Free Your Trial</p>
    <h2>Signup Now. Its Free 
And Takes Less Than 3 Minutes</h2>
<p style={{maxWidth:800,margin:'0 auto',color:'gray'}}>This should be used to tell a story and let your users know a little more about your product or service. How can you benefit them?</p>
<table className='tablefrom' >
       <tbody>
       <tr>
           <td>
               <div style={{width:80,paddingRight:15,textAlign:'left',fontWeight:'bold'}}>Name*</div>
             <div><Input name='name' onChange={(text)=>{setName(text.target.value)}} value={name}></Input></div>
             <div style={{float:'left'}}><span  style={{color:'red',fontSize:10}}>{checkName}</span></div>
           </td>
         
       </tr>
       <tr>
           <td>
               <div style={{width:155,paddingRight:65,textAlign:'left',fontWeight:'bold'}} >Your email*</div>
               <div><Input type='text'  name='email' onChange={(text)=>{setEmail(text.target.value)}} value={email}></Input></div>
               <div style={{float:'left'}}><span  style={{color:'red',fontSize:10}}>{checkEmail}</span></div>
           </td>
         
       </tr>
       <tr>
           <td>
               <div style={{width:200,paddingRight:70,textAlign:'left',fontWeight:'bold'}} >Phone Number*</div>
               <div><Input type='number' name='number' onChange={(text)=>{setNumber(text.target.value)}} value={number}></Input></div>
               <div style={{float:'left'}}><span style={{color:'red',fontSize:10}}>{checkPhone}</span></div>
           </td>
         
       </tr>
       <tr>
           <td>
           <button onClick={()=>checkValidate()}  className='btn-call'>Call to action</button>
           </td>
         
       </tr>
       </tbody>
   </table>
 
</div>
)
}
export default Boxfrom