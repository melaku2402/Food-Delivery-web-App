import React from 'react'
import classes from './Carousel.module.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {img} from './img/data.js'
const CarouselEffect =() =>{
  return (
    <div>
      <Carousel 
      autoPlay={true}
      infiniteLoop={true}
      showIndicators={false}
      showThumbs={false}
      >
        {
            img.map((imageItemLink)=>{
                return <img src={imageItemLink} alt="" />
            })
        }
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;