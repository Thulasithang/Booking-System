import React, { useEffect, useState } from "react";
import {
  ActionContainer,
  ActionButton,
  MainContainer,
  TitleHeader,
  ModalForm,
  ModalField,
  DialogHeader,
  CancelButton,
  AddButton,
  HeadContainer,
} from "../../styles/admin/global";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Table from "../components/Table";

export default function ManageFacilityType() {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const [facilityTypeDataList, setFacilityTypeDataList] = useState();
  const columns = [
    { field: "type_id", headerName: "ID", width: 70 },
    { field: "type_name", headerName: "Facility Type Name", width: 200 },
    // { field: 'price_per_hour', headerName: 'Price per Hour', width: 130 },
    // { field: 'monday', headerName: 'Monday', type: 'array', width: 130 },
  ];
  const [open, setOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSecondOpen = () => setSecondOpen(true);
  const handleSecondClose = () => {
    setSecondOpen(false);
    handleClose();
  };

  useEffect(() => {
    const fetchFacilitiesData = async () => {
      try {
        const facilityTypeData = axios.get(`${backend_url}type`);
        console.log("reloaded once");
        setFacilityTypeDataList((await facilityTypeData).data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchFacilitiesData();
  }, [secondOpen]);

  function getRowId(row) {
    return row.type_id;
  }

  return (
    <MainContainer>
      <HeadContainer>
        <TitleHeader variant="h1">Manage Facility Types</TitleHeader>
        <ActionContainer>
          <ActionButton variant="contained" onClick={handleOpen}>
            Add Facility Type
          </ActionButton>
        </ActionContainer>
      </HeadContainer>
      {/* Table */}
      {facilityTypeDataList && (
        <Table
          columns={columns}
          rows={facilityTypeDataList}
          primaryKeyField={"type_id"}
        />
      )}
      {/*  */}
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
            const small_description = formJson.small_description;
            const large_description = formJson.large_description;
            console.log(`${backend_url}type/add`);
            // handleSecondOpen();
            axios
              .post(`${backend_url}type/add`, {
                name: name,
                small_description: small_description,
                large_description: large_description,
              })
              .then((response) => {
                console.log(response);
                if (response.data.status === 200) {
                  console.log("Facility Type Added");
                  handleSecondOpen();
                } else if (response.data.status === 409) {
                  setMessage("Facility Type already exists");
                  alert(message);
                }
                // handleClose();
              })
              .catch((error) => {
                console.log(error);
              });
          },
        }}
      >
        <ModalForm>
          <DialogHeader variant="h5">New Facility Type</DialogHeader>
          <DialogContent>
            <Stack direction="column">
              <ModalField variant="h6">Type Name</ModalField>
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
              <ModalField variant="h6">Small Description</ModalField>
              <TextField
                size="small"
                margin="dense"
                required
                id="small_description"
                name="small_description"
                autoFocus
                //   error={emailError}
              />
            </Stack>
            <Stack direction="column">
              <ModalField variant="h6">Large Description</ModalField>
              <TextField
                multiline
                size="small"
                margin="dense"
                required
                id="large_description"
                name="large_description"
                autoFocus
                //   error={emailError}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <CancelButton onClick={handleClose}>CANCEL</CancelButton>
            <AddButton variant="contained" type="submit">
              Add
            </AddButton>
          </DialogActions>
        </ModalForm>
      </Dialog>

      <Dialog
        maxWidth="sm"
        fullWidth={false}
        open={secondOpen}
        onClose={handleSecondClose}
      >
        <DialogContent>
          <Box>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6">Facility Type Added</Typography>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </MainContainer>
  );
}
