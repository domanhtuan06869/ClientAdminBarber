import React ,{ useRef, useEffect,useState,lazy}from 'react'

import doitac from '../assets/image/doitac1.png'
import doitac2 from '../assets/image/doitac2.png'
import product from '../assets/image/spnoibat.png'
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "../assets/css/style.css";
import "../assets/css/slider-animations.css";

function Slide({listSlider}){

 
return(

<div   className='body-product' >
<Slider className="slider-wrapper"  autoplay={3000}>
      {listSlider.map((item, index) => (
      <div key={item._id} className='body-product' >
      <div className='product'>
      <p>{item.Stt}</p>
      <h3>{item.Title}</h3>
      <p id='product-content'>{item.Content}</p>
      </div>
      <div className='product'>
      <img  class="card-img-top img-responsive" src={item.UrlImage} alt="Card image cap" />
      
      </div>
  
  </div>
      ))}
    </Slider>
    
    </div>


)
}
export default Slide