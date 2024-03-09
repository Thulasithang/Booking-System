import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Data } from "../data/data";
import axios from "axios";
import {
  BookingPageContainer,
  FacilityBox,
  FacilityName,
  TimeSlotBox,
} from "../../styles/pages/BookingPage";
import { Button, colors } from "@mui/material";
import { Colors } from "../../styles/theme";

export default function BookingPage() {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  let { type_id } = useParams();
  console.log("type_id: ", type_id);
  const [facilitiesByType, setFacilitiesByType] = useState();

  useEffect(() => {
    const fetchFacilitiesByType = async () => {
      try {
        const facilitiesByType = await axios.get(`${backend_url}`, {
          params: {
            type_id: type_id,
          },
        });
        setFacilitiesByType((await facilitiesByType).data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchFacilitiesByType();
  }, []);
  console.log(facilitiesByType);
  return (
    <BookingPageContainer>
      {facilitiesByType &&
        facilitiesByType.map((facility, index) => {
          return (
            <BookingPageContainer>
              <FacilityBox>
                <FacilityName>{facility.facility_name}</FacilityName>
                <TimeSlotBox>
                {facility.monday.map((timeSlot, index) => {
                  return (
                      <Button variant="contained" sx={{borderRadius: '10px', background: Colors.light_gray, color: Colors.info}} key={index}>
                        {timeSlot}
                      </Button>
                  );
                })}
                </TimeSlotBox>
              </FacilityBox>
            </BookingPageContainer>
          );
        })}
    </BookingPageContainer>
  );
}
