import React from 'react'
import { Box, Typography } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'

const CarouselItem = (items) => {
  return (
    <Carousel 
      autoPlay={true}
      interval={3000}
      infiniteLoop={true}
      showThumbs={false}
      stopOnHover={false}
      transitionTime={1000}
      swipeable={true}
      emulateTouch={true}
      showArrows={false}
      showStatus={false}
      showIndicators={false}
      >
        <div>
          <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" alt="Slide 1" />
        </div>
        <div>
          <img src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Slide 2" />
        </div>
        <div>
          <img src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630" alt="Slide 3" />
        </div>
      </Carousel>

  )
}

export default CarouselItem;