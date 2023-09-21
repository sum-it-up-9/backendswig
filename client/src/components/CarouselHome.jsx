import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



const CarouselHome = () => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
   
      <div className='bg-custom flex justify-center h-92'>
        <div className='flex md:ml-0 ml-16 items-center gap-8 w-2/3 h-full'>
            <div className=' my-8 '>
              <img className='w-4/5' src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/kmewp8efed0ev7yvfyx6" alt="firstI" />
            </div>
            <div className='  hidden md:block'>
              <img className=' w-4/5' src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/c59djn2nskqlf0ork6wc" alt="Second" />
            </div>
            <div className='r hidden md:block'>
              <img className=' w-4/5 ' src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/lgxbfmjfi9ba7sqbliek" alt="third" />
            </div>
        </div>
      </div>
   
  )
}

export default CarouselHome
