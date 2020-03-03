import React,{useRef,useEffect} from 'react'
import BoxHeader from '../components/BoxHeader'
import { Button } from 'reactstrap';
import kyc from '../assets/image/kyc.png'
import kycgoogle from '../assets/image/kycg.png'
import kycfb from '../assets/image/facebookkyc.png'
import kyctwitter from '../assets/image/witer.png'
function Footer(props){
 
    useEffect(()=>{

    },[])

return(
<div ref={props.refs} className='div-footer'>
<div className='footer-item'>
    <img src={kyc}></img>
    <p style={{color:'gray'}}>KYC SOLUTIONS J.S.C <br/>
    Công ty Cổ phần Giải Pháp Phần Mềm KYC</p>
</div>
<div className='footer-item'>
 <h3>Out adress</h3>
 <p style={{color:'gray',fontSize:14}}>Suite 502, 5th Floor, No.03 Chua Lang St, Dong Da Dist, Ha Noi, Viet Nam</p>
</div>

<div className='footer-item'>
    <h3>Email contact</h3>
    <p style={{color:'gray',fontSize:14}}>Suite 502, 5th Floor, No.03 Chua Lang St, Dong Da Dist, Ha Noi, Viet Nam</p>
</div>
<hr></hr>
<div className='sp-footer'>
<div id='sp-footer-item1' className='sp-footer-item'>
2019 - 2018 ©  <span style={{color:'blue',fontSize:14}}> ExplicitConcepts</span>. All rights reserved.
</div>
<div id='sp-footer-item' className='sp-footer-item'>
<img className='img-spfooter' src={kycgoogle}></img>
<img className='img-spfooter'  src={kycfb}></img>
<img className='img-spfooter'  src={kyctwitter}></img>
</div>
</div>
</div>
)
}
export default Footer