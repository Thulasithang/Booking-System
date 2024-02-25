import React from "react";
import {
  useTheme,
  useMediaQuery,
} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselItem from "../molecules/Carousel";
import {
  HomeContainer,
  ItemContainer,
  ItemDescription,
  ItemHeader,
  TitleText,
} from "../../styles/pages/HomePage";
import { Data } from "../data/data";
import FacilityCarousel from "../molecules/FacilityCarousel";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <CarouselItem />
      <HomeContainer className="test">
        <TitleText variant="h1">Welcome to Facility System</TitleText>
        {Data.map((item, index) => (
          <>
            <ItemHeader variant="h3">{item.facility}</ItemHeader>

            {isMobile ? (
              <>
              <ItemContainer>
                <ItemDescription variant="body1" key={index}>
                  {item.description}
                </ItemDescription>
              </ItemContainer>
                <FacilityCarousel images={item.carouselImages} />
                </>
            ) : (
              <ItemContainer>
                <ItemDescription variant="body1" key={index}>
                  {item.description}
                </ItemDescription>
                <FacilityCarousel images={item.carouselImages} />
              </ItemContainer>
            )}
          </>
        ))}
      </HomeContainer>
    </>
  );
};

export default HomePage;
