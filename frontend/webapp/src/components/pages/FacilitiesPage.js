import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";
import {
  ContentDescription,
  ContentHeader,
  FacilitiesContainer,
  FacilityBookButton,
  FacilityContainer,
  FacilityContent,
  FacilityImage,
} from "../../styles/pages/FacilitiesPage";
import { Data } from "../data/data";

export default function FacilitiesPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleBookNowNavigation = (id) => {
    console.log(id);
    navigate(`/book/${id}`);
  };

useEffect(() => {
}, []);

  return (
    <FacilitiesContainer>
      <Typography variant="h2" align="center">
        Our Facilities
      </Typography>
      {Data.map((facility, index) => {
        return (
          <FacilityContainer direction={index % 2 !== 0 ? "left" : "right"}>
            <FacilityImage src={facility.image} alt={facility.alt} />
            <FacilityContent>
              <ContentHeader variant="h3">{facility.facility}</ContentHeader>
              <ContentDescription>{facility.description}</ContentDescription>
              <FacilityBookButton
                variant="contained"
                onClick={() => handleBookNowNavigation(facility.fac_id)}
              >
                Book Now
              </FacilityBookButton>
            </FacilityContent>
          </FacilityContainer>
        );
      })}
    </FacilitiesContainer>
  );
}
