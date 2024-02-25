import { Box, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { ItemCarouselImage } from "../../styles/pages/HomePage";

export default function FacilityCarousel({ images }) {
    console.log(images);
    const fadeAnimationHandler = (props, state) => {
        const transitionTime = 1000 + 'ms';
        const transitionTimingFunction = 'ease-in-out';
    
        let slideStyle = {
            position: 'absolute',
            display: 'block',
            zIndex: -2,
            minHeight: '100%',
            opacity: 0,
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            transitionTimingFunction: transitionTimingFunction,
            msTransitionTimingFunction: transitionTimingFunction,
            MozTransitionTimingFunction: transitionTimingFunction,
            WebkitTransitionTimingFunction: transitionTimingFunction,
            OTransitionTimingFunction: transitionTimingFunction,
        };
    
        if (!state.swiping) {
            slideStyle = {
                ...slideStyle,
                WebkitTransitionDuration: transitionTime,
                MozTransitionDuration: transitionTime,
                OTransitionDuration: transitionTime,
                transitionDuration: transitionTime,
                msTransitionDuration: transitionTime,
            };
        }
    
        return {
            slideStyle,
            selectedStyle: { ...slideStyle, opacity: 1, position: 'relative' },
            prevStyle: { ...slideStyle },
        };
    };

  return (
    <Carousel
      autoPlay={true}
      interval={4000}
      infiniteLoop={true}
      showThumbs={false}
      stopOnHover={false}
      transitionTime={0}
      swipeable={false}
      emulateTouch={true}
      showArrows={false}
      showStatus={false}
      showIndicators={true}
      // animationHandler={'fade'}
      // fadeAnimationHandler={fadeAnimationHandler}
    >
     {images &&
        images.map((image, index) => (
          <ItemCarouselImage
            src={image}
            key={index}
            alt="facility"
          />
        ))}
    </Carousel>
  );
}
