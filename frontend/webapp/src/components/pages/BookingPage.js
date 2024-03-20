import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import {
  BookingImage,
  BookingPageContainer,
  CalendarBox,
  FacilityBox,
  FacilityName,
  TimeSlotBox,
  TimeSlotContainer,
} from "../../styles/pages/BookingPage";
import { Box, Button, Typography, colors } from "@mui/material";
import { Colors } from "../../styles/theme";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CarouselItem from "../molecules/Carousel";

export default function BookingPage() {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  let { type_id } = useParams();
  console.log("type_id: ", type_id);
  const [showTimeSlots, setShowTimeSlots] = useState(true);
  const [facilitiesByType, setFacilitiesByType] = useState();
  const [date, setDate] = useState(dayjs());
  const [day, setDay] = useState(dayjs().format("dddd"));

  useEffect(() => {
    const fetchFacilitiesByType = async () => {
      try {
        const facilitiesByType = await axios.get(`${backend_url}tt/available`, {
          params: {
            type_id: type_id,
            date: date,
          },
        });
        setFacilitiesByType((await facilitiesByType).data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchFacilitiesByType();
  }, [date, type_id]);
  console.log(facilitiesByType);

  const handleDateChange = (newDate) => {
    var formatted_date = dayjs(newDate).format("YYYY-MM-DD");
    setDate(formatted_date);
    console.log("newDate: ", formatted_date);
    setShowTimeSlots(true);
    setDay(dayjs(newDate).format("dddd"));
  };

  return (
    <BookingPageContainer> 
      <BookingImage src="/images/booking-badminton.jpg" />
      <CalendarBox>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={dayjs(date)}
            minDate={dayjs()}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </CalendarBox>
      <TimeSlotContainer className="test">
        {facilitiesByType &&
          showTimeSlots &&
          facilitiesByType?.map((facility, index) => {
            return (
              <FacilityBox>
                <FacilityName>{facility.facility_name}</FacilityName>
                <TimeSlotBox>
                  {facility.slots.length > 0 ? (
                    facility.slots?.map((timeSlot, index) => {
                      return (
                        <Button
                          key={index}
                          variant="contained"
                          sx={{
                            borderRadius: "10px",
                            background: Colors.light_gray,
                            color: Colors.secondary,
                          }}
                        >
                          {timeSlot}
                        </Button>
                      );
                    })
                  ) : (
                    <Typography variant="h6" sx={{ color: Colors.danger }}>
                      No time slots available
                    </Typography>
                  )}
                </TimeSlotBox>
              </FacilityBox>
            );
          })}
      </TimeSlotContainer>
    </BookingPageContainer>
  );
}
