import { useEffect, useState } from "react";
import {
  ActionButton,
  ActionContainer,
  HeadContainer,
  MainContainer,
  ModalField,
  ModalForm,
  TitleHeader,
} from "../../styles/admin/global";
import axios from "axios";
import Table from "../components/Table";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import SnackBar from "../components/SnackBar";

export default function ManageCoaches() {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const [coachesDataList, setCoachesDataList] = useState();
  const [openCoachDialogBox, setOpenCoachDialogBox] = useState(false);
  const [type, setType] = useState("");
  const [typeList, setTypeList] = useState([]);
  const [snackbar, setSnackbar] = useState(false);
  const columns = [
    { field: "coach_id", headerName: "ID", width: 70 },
    { field: "type_id", headerName: "Coaches", width: 130 },
    { field: "price_per_hour", headerName: "Price per Hour", width: 130 },
  ];

  useEffect(() => {
    const fetchCoachesData = async () => {
      try {
        const coachesData = axios.get(`${backend_url}coaches`);
        console.log("reloaded once");
        setCoachesDataList((await coachesData).data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCoachesData();
  }, []);

  const handleOpenCoachDialogBox = () => {
    setOpenCoachDialogBox(true);
  };

  const handleCloseCoachDialogBox = () => {
    setType("");
    setOpenCoachDialogBox(false);
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

  return (
    <MainContainer>
      <HeadContainer>
        <TitleHeader variant="h1">Manage Coaches</TitleHeader>
        <ActionContainer>
          <ActionButton variant="contained" onClick={handleOpenCoachDialogBox}>
            Add New Coach
          </ActionButton>
        </ActionContainer>
      </HeadContainer>

      {/* Table */}
      {coachesDataList && (
        <Table
          pageURL={"/manage/coaches"}
          columns={columns}
          rows={coachesDataList}
          primaryKeyField={"coach_id"}
        />
      )}
      {/*  */}

      {/* Dialog box to get general details about the coach */}
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={openCoachDialogBox}
        onClose={handleCloseCoachDialogBox}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            // const email = formJson.email;
            const name = formJson.name;
            const phone = formJson.phone;
            const type = formJson.type;
            const description = formJson.description;
            const image = formJson.image;
            const email = formJson.email;
            const price_per_hour = formJson.price_per_hour;
            console.log({
              name: name,
              phone: phone,
              email: email,
              description: description,
              image: image,
              type: type,
              price_per_hour: price_per_hour,
            });
            console.log(`${backend_url}add`);
            axios
              .post(`${backend_url}coach/add`, {
                name: name,
                phone: phone,
                email: email,
                description: description,
                image: image,
                type: type,
                price_per_hour: price_per_hour,
              })
              .then((response) => {
                console.log(response);
                if (response.data.status === 200) {
                  console.log("Facility Added");
                  setSnackbar(true);
                  handleCloseCoachDialogBox();
                  setType("");
                } else if (response.data.status === 409) {
                  alert("Coach Already Exists");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          },
        }}
      >
        <ModalForm>
          <Stack direction="row" justifyContent={"space-between"}>
            <TitleHeader variant="h6">New Coach</TitleHeader>
            <Button onClick={handleCloseCoachDialogBox}>X</Button>
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
              />
            </Stack>
            <Stack direction="column">
              <ModalField variant="h6">Contact Number</ModalField>
              <TextField
                size="small"
                margin="dense"
                required
                id="phone"
                name="phone"
                autoFocus
                //   error={emailError}
              />
            </Stack>
            <Stack direction="column">
              <ModalField variant="h6">Email Address</ModalField>
              <TextField
                size="small"
                margin="dense"
                required
                id="email"
                name="email"
                autoFocus
                //   error={emailError}
              />
            </Stack>
            <Stack direction="column">
              <ModalField variant="h6">Description</ModalField>
              <TextField
                multiline
                size="small"
                margin="dense"
                required
                id="description"
                name="description"
                autoFocus
                //   error={emailError}
              />
            </Stack>
            <Stack direction="column">
              {/* TODO Add Image and configure database */}
              <ModalField variant="h6">Image</ModalField>
              <TextField
                multiline
                size="small"
                margin="dense"
                required
                id="image"
                name="image"
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
            <Button onClick={handleCloseCoachDialogBox}>Cancel</Button>
            <Button variant="contained" type="submit">
              Add
            </Button>
          </DialogActions>
        </ModalForm>
      </Dialog>
      {/*  */}

      <SnackBar open={snackbar} setOpen={setSnackbar} message={"Added Coach Successfully"}/>
    </MainContainer>
  );
}
