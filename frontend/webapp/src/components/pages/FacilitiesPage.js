import React, { useEffect, useState } from "react";
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
import axios from "axios";

export default function FacilitiesPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const [facilityTypeDataList, setFacilityTypeDataList] = useState();

  const handleBookNowNavigation = (id) => {
    console.log("id:", id);
    navigate(`/book/${id}`);
  };

useEffect(() => {
  const fetchFacilityTypeData = async () => {
    try {
      const facilityTypeData = await axios.get(`${backend_url}type`);
      // console.log((await facilitiesData).data);
      setFacilityTypeDataList((await facilityTypeData).data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  fetchFacilityTypeData();
}, []);

  console.log(facilityTypeDataList);
  return (
    <FacilitiesContainer>
      <Typography variant="h2" align="center">
        Our Facilities
      </Typography>
      { facilityTypeDataList && facilityTypeDataList.map((facility, index) => {
        return (
          <FacilityContainer direction={index % 2 !== 0 ? "left" : "right"}>
            <FacilityImage src='./images/main-swimming.jpg' alt={facility.alt} />
            <FacilityContent>
              <ContentHeader variant="h3">{facility.type_name}</ContentHeader>
              <ContentDescription>{facility.small_description}</ContentDescription>
              <FacilityBookButton
                variant="contained"
                onClick={() => handleBookNowNavigation(facility.type_id)}
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
