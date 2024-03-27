import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  ActionButton,
  ActionContainer,
  AddButton,
  CustomTab,
  MainContainer,
  ModalField,
  TabContainer,
  TimePickerContainer,
  TimeTableContainer,
  TitleHeader,
} from "../../styles/admin/global";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Switch,
  Tabs,
  TextField,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import dayGridPlugin from "@fullcalendar/daygrid"; // for dayGridMonth view
import PropTypes from "prop-types";
import axios from "axios";
import { Colors } from "../../styles/theme";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import SnackBar from "../components/SnackBar";

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

export default function CoachesEditPage() {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  let { id } = useParams();

  const [coachName, setCoachName] = useState("");
  const [maxStudents, setMaxStudents] = useState(0);
  const [typeId, setTypeId] = useState(0);
  const [pricePerHour, setPricePerHour] = useState(0);
  const [repeat, setRepeat] = useState(0);
  const [timeTableOpen, setTimeTableOpen] = React.useState(false);
  const [facility, setFacility] = useState("");
  const [facilityList, setFacilityList] = useState([]);
  const [startDate, setStartDate] = useState(dayjs());
  const [tabValue, setTabValue] = React.useState(0);
  const [timeSlotRecords, setTimeSlotRecords] = useState([]);
  const [snackbar, setSnackbar] = useState(false);
  const [isTimeSlotRecordsUpdated, setTimeSlotRecordsUpdated] = useState(false);


  const [timeTable, setTimeTable] = useState([
    {
      day: "Monday",
      isOpen: false,
      open: dayjs("08:00"),
      close: dayjs("17:00"),
    },
    {
      day: "Tuesday",
      isOpen: false,
      open: dayjs("08:00"),
      close: dayjs("17:00"),
    },
    {
      day: "Wednesday",
      isOpen: false,
      open: dayjs("08:00"),
      close: dayjs("17:00"),
    },
    {
      day: "Thursday",
      isOpen: false,
      open: dayjs("08:00"),
      close: dayjs("17:00"),
    },
    {
      day: "Friday",
      isOpen: false,
      open: dayjs("08:00"),
      close: dayjs("17:00"),
    },
    {
      day: "Saturday",
      isOpen: false,
      open: dayjs("08:00"),
      close: dayjs("17:00"),
    },
    {
      day: "Sunday",
      isOpen: false,
      open: dayjs("08:00"),
      close: dayjs("17:00"),
    },
  ]);

  const dayOfWeekMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        const response = await axios.get(`${backend_url}coaches/${id}`);
        setCoachName(response.data.coach_name);
        setPricePerHour(response.data.price_per_hour);
        setTypeId(response.data.type_id);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCoachData();
  }, []);

  useEffect(() => {
    const fetchFacilityData = async () => {
      try {
        const response = await axios.get(`${backend_url}`, {
          params: { type_id: typeId },
        });
        setFacilityList(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchFacilityData();
  }, [typeId]);

  useEffect(() => {
    console.log("timeSlotRecords: ", timeSlotRecords);
  }, [timeSlotRecords]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  //Open and close functions for the timetable Dialog Box
  const handleTimeTableOpen = () => setTimeTableOpen(true);
  const handleTimeTableClose = () => setTimeTableOpen(false);

  const handleSwitchChange = (index) => (event) => {
    const updatedTimeTable = [...timeTable];
    updatedTimeTable[index].isOpen = !timeTable[index].isOpen;
    setTimeTable(updatedTimeTable);
  };

  const handleTimeChange = (index, type) => (time) => {
    const updatedTimeTable = [...timeTable];
    const formattedTime = dayjs(time).format("HH:mm:ss");
    updatedTimeTable[index][type] = formattedTime;
    setTimeTable(updatedTimeTable);
  };

  const handleSaveDetails = (event) => {
    event.preventDefault();
    // Perform save operation using the form data
    alert("came to save");
    // axios
    //   .put(`${backend_url}${id}`, {
    //     facility_name: facilityName,
    //     max_users: maxUsers,
    //     price_per_hour: pricePerHour,
    //   })
    //   .then((response) => {
    //     alert("came to alert");
    //     if (response.status === 200) {
    //       console.log("Facility updated successfully");
    //       alert("Facility updated successfully");
    //     } else {
    //       console.log("Error updating facility");
    //       alert("Error updating facility");
    //     }
    //   });
  };

  const getNextOccurence = (startDate, day) => {
    const startDayOfWeek = dayjs(startDate).day();

    const dayOfWeekNumber = dayOfWeekMap[day];

    let daysToAdd = dayOfWeekNumber - startDayOfWeek;

    if (daysToAdd < 0) {
      daysToAdd += 7;
    }

    return dayjs(startDate).add(daysToAdd, "days");
  };

  const handleTimeTableSave = (event) => {
    event.preventDefault();
    setTimeSlotRecords([]);
    const start_date = startDate.format("YYYY-MM-DD");
    const timeToSend = timeTable.filter((day) => day.isOpen);
    if (timeToSend.length === 0) {
      alert("Please select atleast one day");
      return;
    } else {
      timeToSend.forEach((day) => {
        const nextDate = getNextOccurence(start_date, day.day);
        setTimeSlotRecords((timeSlotRecords) => [
          ...timeSlotRecords,
          {
            start_date: nextDate.format("YYYY-MM-DD"),
            start_time: day.open,
            close_time: day.close,
          },
        ]);
      });
      setTimeSlotRecordsUpdated(true);
    }
  };

  useEffect(() => {
    axios
      .post(`${backend_url}tt/coach/add`, {
        coach_id: id,
        date_time: timeSlotRecords,
        repeat: repeat,
        fac_id: facility,
        max_students: maxStudents,
      })
      .then((response) => {
        if (response.status === 200) {
          setSnackbar(true);
          console.log("Time slots added successfully");
          setTimeSlotRecordsUpdated(false);
        } else {
          console.log("Error adding time slots");
          alert("Error adding time slots");
        }
      });
  }, [isTimeSlotRecordsUpdated === true]);

  return (
    <MainContainer>
      <TitleHeader variant="h1">Edit Coach</TitleHeader>
      <TabContainer>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <CustomTab label="Edit Facility Details" {...a11yProps(0)} />
            <CustomTab label="Add New Time Slots" {...a11yProps(1)} />
          </Tabs>
        </Box>

        {/* Tab with general details */}

        <CustomTabPanel value={tabValue} index={0}>
          <form onSubmit={handleSaveDetails} sx={{ display: "flex" }}>
            <TextField
              fullWidth
              label="Coach Name"
              value={coachName}
              onChange={(e) => setCoachName(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Max Users"
              value={maxStudents}
              onChange={(e) => setMaxStudents(e.target.value)}
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
        {/*  */}

        {/* Tab with timetable */}
        <CustomTabPanel value={tabValue} index={1}>
          <Box>
            <ActionContainer>
              <ActionButton variant="contained" onClick={handleTimeTableOpen}>
                Add New Slots
              </ActionButton>
            </ActionContainer>

            {/* Full Calendar to show work times of coach */}
            <FullCalendar
              plugins={[timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              selectable={true}
              allDaySlot={false}
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5],
                startTime: "08:00",
                endTime: "18:00",
              }}
              events={[
                {
                  title: "event 1",
                  start: "2024-03-26T12:30:00",
                  end: "2024-03-26T18:30:00",
                  allDay: false,
                },
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "timeGridWeek,timeGridDay",
              }}
              select={(info) => {
                alert("selected " + info.start + " to " + info.end);
              }}
            />
          </Box>
          {/*  */}

          {/* Dialog Box to get opening hours of the facility */}
          <Dialog
            maxWidth="sm"
            fullWidth={true}
            open={timeTableOpen}
            onClose={handleTimeTableClose}
            PaperProps={{
              component: "form",
              onSubmit: handleTimeTableSave,
            }}
          >
            <DialogContent>
              {/* iterate through 7 days and get opening and closing time */}
              {timeTable.map((day, index) => (
                <TimeTableContainer key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: 1,
                      justifyContent: "space-between",
                      alignItems: "center",
                      maxWidth: "30%",
                    }}
                  >
                    <ModalField variant="h6">{day.day}</ModalField>
                    <Switch
                      checked={day.isOpen}
                      onChange={handleSwitchChange(index)}
                    />
                  </Box>

                  {/* Open timepickers if the day is selected using the switch */}
                  {day.isOpen && (
                    <TimePickerContainer>
                      <LocalizationProvider
                        key={index}
                        dateAdapter={AdapterDayjs}
                      >
                        <Stack
                          direction={"row"}
                          spacing={2}
                          justifyContent={"space-between"}
                        >
                          <TimePicker
                            label="Opens at"
                            views={["hours", "minutes"]}
                            value={day.open ? day.open : null}
                            onChange={handleTimeChange(index, "open")}
                          />
                          <TimePicker
                            label="Closes at"
                            value={day.close ? day.close : null}
                            onChange={handleTimeChange(index, "close")}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </TimePickerContainer>
                  )}
                </TimeTableContainer>
              ))}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                }}
              >
                <Stack direction="column" sx={{ width: "30%" }}>
                  <ModalField variant="h6">Start From</ModalField>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ maxWidth: "100%" }}
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </LocalizationProvider>
                </Stack>
                <Stack direction="column" sx={{ width: "30%" }}>
                  <ModalField variant="h6">Repeat For</ModalField>
                  <TextField
                    type="number"
                    id="repeat"
                    name="repeat"
                    onChange={(event) => {
                      setRepeat(event.target.value);
                    }}
                    sx={{ maxWidth: "100%" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Months</InputAdornment>
                      ),
                    }}
                    helperText="Leave as 0 for one time booking"
                  />
                </Stack>
                <Stack direction="column" sx={{ width: "40%" }}>
                  <ModalField variant="h6">Facility Using</ModalField>
                  <Select
                    id="type"
                    onChange={(event) => {
                      setFacility(event.target.value);
                    }}
                    name="type"
                    value={facility}
                  >
                    {facilityList?.map((facility, index) => {
                      return (
                        <MenuItem value={facility.fac_id} key={index}>
                          {facility.facility_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Stack>
              </Box>
              <DialogActions>
                <Button type="submit" variant="contained">
                  Add
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
          {/*  */}
        </CustomTabPanel>
      </TabContainer>
      <SnackBar
        open={snackbar}
        setOpen={setSnackbar}
        message="Time slots added successfully"
      />
    </MainContainer>
  );
}
