import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  ActionButton,
  AddButton,
  CancelButton,
  CustomTab,
  HeadContainer,
  MainContainer,
  ModalContainer,
  ModalField,
  ModalForm,
  TabContainer,
  TimeTableContainer,
  TitleHeader,
} from "../../styles/admin/global";
import {
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  TabPanel,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

import PropTypes from "prop-types";
import axios from "axios";
import { Colors } from "../../styles/theme";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function FacilitiesEditPage() {
  const location = useLocation(); // Get the location object from the location prop
  const [facilityName, setFacilityName] = useState(
    location.state.row.facility_name
  );
  const [maxUsers, setMaxUsers] = useState(location.state.row.max_users);
  const [pricePerHour, setPricePerHour] = useState(
    location.state.row.price_per_hour
  );
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  let { id } = useParams();
  const [value, setValue] = useState(dayjs());
  const [timeSlots, setTimeSlots] = useState([]);
  const [tabValue, setTabValue] = React.useState(0);
  const [openTimeSlots, setOpenTimeSlots] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [dayOfWeek, setDayOfWeek] = useState(value.format("dddd"));
  console.log("dayOfWeek: ", dayOfWeek);
  const days = [
    // eslint-disable-next-line no-undef
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTimeSlotsChange = (newValue) => {
    setValue(newValue);
    setDayOfWeek(newValue.format("dddd").toLowerCase());
    // setOpenCalendar(false);
    setOpenTimeSlots(true);
  };

  const isSelected = (timeSlot) => {
    return timeSlots.includes(timeSlot);
  };

  const handleSlotSelect = (timeSlot) => {
    setDisableButton(true);
    if (isSelected(timeSlot)) {
      setTimeSlots(timeSlots.filter((slot) => slot !== timeSlot));
    } else {
      setTimeSlots([...timeSlots, timeSlot]);
    }
  };

  console.log("timeSlots: ", timeSlots);

  const handleSave = (event) => {
    event.preventDefault();
    // Perform save operation using the form data
    // console.log("Facility Name:", facilityName);
    // console.log("Max Users:", maxUsers);
    // console.log("Price Per Hour:", pricePerHour);
    alert("came to save");
    axios
      .put(`${backend_url}${id}`, {
        facility_name: facilityName,
        max_users: maxUsers,
        price_per_hour: pricePerHour,
      })
      .then((response) => {
        alert("came to alert");
        if (response.status === 200) {
          console.log("Facility updated successfully");
          alert("Facility updated successfully");
        } else {
          console.log("Error updating facility");
          alert("Error updating facility");
        }
      });
  };

  const handleDisableTimeSlots = (event) => {
    event.preventDefault();
    axios
      .post(`${backend_url}tt`, {
        fac_id: id,
        exception_date: value.format("YYYY-MM-DD"),
        removed_slots: timeSlots,
      })
      .then((response) => {
        console.log("response: ", response);
        if (response.data.status === 200) {
          console.log("Slots disabled successfully");
          alert("Slots disabled successfully");
          window.location.reload();
        } else if (response.data.status === 409) {
          console.log("Slots already filled");
          alert("Slots already disabled");
        } else {
          console.log("Error disabling time slots");
          alert("Error disabling time slots");
        }
      });
  };

  console.log("day: ", value.format("YYYY-MM-DD"));
  console.log("location: ", location.state);
  return (
    <MainContainer>
      <TitleHeader variant="h1">Edit Facility</TitleHeader>
      <TabContainer>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <CustomTab label="Edit Facility Details" {...a11yProps(0)} />
            <CustomTab label="Disable Time Slots" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          <form onSubmit={handleSave} sx={{ display: "flex" }}>
            <TextField
              fullWidth
              label="Facility Name"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Max Users"
              value={maxUsers}
              onChange={(e) => setMaxUsers(e.target.value)}
              variant="outlined"
              margin="normal"
              type="number"
            />
            <TextField
              fullWidth
              label="Price Per Hour"
              value={pricePerHour}
              onChange={(e) => setPricePerHour(e.target.value)}
              variant="outlined"
              margin="normal"
              type="number"
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <AddButton variant="contained" type="submit">
                Save
              </AddButton>
            </Box>
          </form>
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={value}
                minDate={dayjs()}
                onChange={handleTimeSlotsChange}
              />
            </LocalizationProvider>
          </Box>

          {openTimeSlots && (
            <>
              <ModalField variant="h3">{dayOfWeek.toUpperCase()}</ModalField>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {location.state.row[dayOfWeek] ? (
                  location.state.row[dayOfWeek]?.map((timeSlot, timeIndex) => {
                    return (
                      <Button
                        variant="contained"
                        key={timeIndex}
                        color={isSelected(timeSlot) ? "info" : "primary"}
                        onClick={() => {
                          handleSlotSelect(timeSlot);
                        }}
                        sx={{
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                      >
                        {timeSlot}
                      </Button>
                    );
                  })
                ) : (
                  <ModalField
                    sx={{ color: Colors.danger }}
                    variant="h6"
                    component="span"
                  >
                    No time slots available
                  </ModalField>
                )}
              </Box>
            </>
          )}
          {disableButton && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  background: Colors.danger,
                  color: Colors.white,
                  justifySelf: "flex-end",
                }}
                type="button"
                onClick={handleDisableTimeSlots}
              >
                Disable Time Slots
              </Button>
            </Box>
          )}
        </CustomTabPanel>
      </TabContainer>
    </MainContainer>
  );
}
