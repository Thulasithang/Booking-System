import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { Data } from "../data/data";
import { MainCarouselImage } from "../../styles/pages/HomePage";

const CarouselItem = () => {
  return (
    <Carousel
      autoPlay={true}
      interval={3000}
      infiniteLoop={true}
      showThumbs={false}
      stopOnHover={false}
      transitionTime={1000}
      swipeable={false}
      emulateTouch={false}
      showArrows={false}
      showStatus={false}
      showIndicators={false}
    >
        {Data.map((item, index) => (
          <MainCarouselImage
            key={index}
            src={item.image}
            alt={item.alt}
          />
        ))}
    </Carousel>
  );
};

export default CarouselItem;
