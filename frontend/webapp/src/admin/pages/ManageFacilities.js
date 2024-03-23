import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ActionContainer,
  ActionButton,
  MainContainer,
  TitleHeader,
  ModalForm,
  ModalField,
  TimeTableContainer,
  TimePickerContainer,
  HeadContainer,
} from "../../styles/admin/global";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Alert from "@mui/material/Alert";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import axios from "axios";
import dayjs from "dayjs";
import Table from "../components/Table";

export default function ManageFacilities() {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const [typeList, setTypeList] = useState([]);
  const [facilitiesDataList, setFacilitiesDataList] = useState();
  const columns = [
    { field: "fac_id", headerName: "ID", width: 70 },
    { field: "facility_name", headerName: "Facility name", width: 130 },
    { field: "price_per_hour", headerName: "Price per Hour", width: 130 },
    { field: "monday", headerName: "Monday", type: "array", width: 130 },
  ];
  const [type, setType] = useState("");

  const [open, setOpen] = React.useState(false);
  const [timeTableOpen, setTimeTableOpen] = React.useState(false);

  //TODO. convert alert to have dyanmic values and make it a snackbar
  const [alert, setAlert] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSnackbarClose = () => setSnackbar(false);
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
  //Open and close functions for the timetable Dialog Box
  const handleTimeTableOpen = () => setTimeTableOpen(true);
  const handleTimeTableClose = () => setTimeTableOpen(false);

  // In the timetable list, isOpen boolean is made to true and
  // new values for open and close are stored.
  const handleSwitchChange = (index) => (event) => {
    console.log(index, event.target.checked);
    const updatedTimeTable = [...timeTable];
    updatedTimeTable[index].isOpen = !timeTable[index].isOpen;
    setTimeTable(updatedTimeTable);
    console.log(`${timeTable[index].day}: `, timeTable[index].isOpen);
  };

  // open and close times are stored in the correct format.
  const handleTimeChange = (index, type) => (time) => {
    const updatedTimeTable = [...timeTable];
    const formattedTime = dayjs(time).format("HH:mm:ss");
    updatedTimeTable[index][type] = formattedTime;
    setTimeTable(updatedTimeTable);
  };

  const handleRowSelection = (row) => {
    console.log("row: ", row.row);
    navigate(`/manage/facilities/${row.id}`, { state: { row: row.row } });
  };

  // every time the drop down list to get facility types is clicked,
  // the list is rendered from the database.
  // List is stored as objects with id and its name.
  // The id is sent to the backend with facility data.
  const handleSelectOpen = (event) => {
    axios
      .get(`${backend_url}type`, {
        params: {
          fields: ["type_id", "type_name"],
        },
      })
      .then((response) => {
        console.log("response from types: ", response.data);
        setTypeList([]);
        for (let i = 0; i < response.data?.length; i++) {
          setTypeList((typeList) => [
            ...typeList,
            {
              type_id: response.data[i].type_id,
              type_name: response.data[i].type_name,
            },
          ]);
        }
      });
  };

  useEffect(() => {
    const fetchFacilitiesData = async () => {
      try {
        const facilitiesData = axios.get(`${backend_url}`);
        // console.log((await facilitiesData).data);
        setFacilitiesDataList((await facilitiesData).data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchFacilitiesData();
  }, [snackbar]);

  function getRowId(row) {
    return row.fac_id;
  }

  console.log(facilitiesDataList);
  return (
    <MainContainer>
      <HeadContainer>
        <TitleHeader variant="h1">Manage Facilities</TitleHeader>
        <ActionContainer>
          <ActionButton variant="contained" onClick={handleOpen}>
            Add New Facility
          </ActionButton>
        </ActionContainer>
      </HeadContainer>
      {/* Table */}
      {facilitiesDataList && (
        <Table
          columns={columns}
          rows={facilitiesDataList}
          primaryKeyField={"fac_id"}
        />
      )}
      {/*  */}

      {/* Dialog Box to get opening hours of the facility */}
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={timeTableOpen}
        onClose={handleTimeTableClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleTimeTableClose();
          },
        }}
      >
        <DialogContent>
          {/* iterate through 7 days and get opening and closing time */}
          {timeTable.map((day, index) => (
            <TimeTableContainer>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                  maxWidth: "40%",
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
                  <LocalizationProvider key={index} dateAdapter={AdapterDayjs}>
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
          <DialogActions>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {/*  */}

      {/* Dialog box to get general details about the facility */}
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            // const email = formJson.email;
            const name = formJson.name;
            const max_users = formJson.max_users;
            const type = formJson.type;
            const obj = {};
            const timeToSend = timeTable.filter((day) => day.isOpen);
            // if no days have been selected at all, an Alert is shown to choose days
            if (timeToSend.length === 0) {
              setAlert(true);
            } else {
              setAlert(false);
              // Create object with days as the keys and open close day as the value.
              // Open and close days are inside an object which is the value.
              timeToSend.map((day) => {
                obj[day.day] = {
                  open: day.open,
                  close: day.close,
                };
              });
              console.log({
                name: name,
                max_users: max_users,
                type: type,
                opening_times: obj,
                price_per_hour: formJson.price_per_hour,
              });
              console.log(`${backend_url}add`);
              axios
                .post(`${backend_url}add`, {
                  name: name,
                  max_users: max_users,
                  type: type,
                  opening_times: obj,
                  price_per_hour: formJson.price_per_hour,
                })
                .then((response) => {
                  console.log(response);
                  if (response.data.status === 200) {
                    console.log("Facility Added");
                    setSnackbar(true);
                    handleClose();
                    // handleSecondOpen();
                    timeTable.map((day) => {
                      day.isOpen = false;
                    });
                    setType("");
                  } else if (response.data.status === 409) {
                    alert("Facility Already Exists");
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          },
        }}
      >
        <ModalForm>
          <Stack direction="row" justifyContent={"space-between"}>
            <TitleHeader variant="h6">New Facility</TitleHeader>
            <Button onClick={handleClose}>X</Button>
          </Stack>
          <DialogContent>
            <Stack direction="column">
              <ModalField variant="h6">Name</ModalField>
              <TextField
                size="small"
                margin="dense"
                required
                id="name"
                name="name"
                autoFocus
                //   error={emailError}
              />
            </Stack>
            <Stack direction="column">
              <ModalField variant="h6">Maximum Players</ModalField>
              <TextField
                type="number"
                size="small"
                margin="dense"
                required
                id="max_users"
                name="max_users"
                autoFocus
                //   error={emailError}
              />
            </Stack>
            <Stack direction="column">
              <ModalField variant="h6">Facility Type</ModalField>
              <Select
                size="small"
                id="type"
                onOpen={handleSelectOpen}
                onChange={(event) => {
                  setType(event.target.value);
                }}
                name="type"
                value={type}
              >
                {typeList.map((type, index) => {
                  return (
                    <MenuItem key={index} value={type.type_id}>
                      {type.type_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Stack>
            <Stack direction="column">
              <ModalField variant="h6">Opening Times</ModalField>
              <Button variant="contained" onClick={handleTimeTableOpen}>
                Add Times
              </Button>
              {alert && <Alert severity="info">Please Add Opening Hours</Alert>}
            </Stack>
            <Stack direction="column">
              <ModalField variant="h6">Price per Hour</ModalField>
              <OutlinedInput
                type="number"
                startAdornment="LKR"
                size="small"
                margin="dense"
                required
                id="price_per_hour"
                name="price_per_hour"
                autoFocus
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit">
              Add
            </Button>
          </DialogActions>
        </ModalForm>
      </Dialog>
      {/*  */}

      <Snackbar
        open={snackbar}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
      >
        <Alert severity="success">Facility Added</Alert>
      </Snackbar>
    </MainContainer>
  );
}
