import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ActionContainer,
  ActionButton,
  MainContainer,
  TitleHeader,
  ModalContainer,
  ModalForm,
  ModalField,
} from "../../styles/admin/global";
import Header from "../navigation/header";
import {
    Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

export default function ManageFacilityType() {
  const navigate = useNavigate();
  const backend_url = process.env.REACT_APP_BACKEND_URL;

  const [open, setOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
    const [message, setMessage] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const handleSecondOpen = () => setSecondOpen(true);
    const handleSecondClose = () => {
        setSecondOpen(false);
        handleClose();
    }

  return (
    <MainContainer>
      <TitleHeader variant="h1">Manage Facility Types</TitleHeader>
      <ActionContainer>
        <ActionButton variant="contained" onClick={handleOpen}>
          Add Facility Type
        </ActionButton>
      </ActionContainer>
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
            axios.post( `${backend_url}type/add`, {
                name: name,
              small_description: small_description,
              large_description: large_description,
            }).then((response) => {
                console.log(response);
                if (response.data.status === 200) {
                    console.log("Facility Type Added");
                    handleSecondOpen();
                } else if (response.data.status === 409) {
                    setMessage("Facility Type already exists");
                    alert(message);
                }
                // handleClose();
                }).catch((error) => {
                console.log(error);
                }
            );
        },
        }}
      >
        <ModalForm>
          <Stack direction="row" justifyContent={"space-between"}>
            <DialogTitle variant="h5">New Facility Type</DialogTitle>
            <Button onClick={handleClose}>X</Button>
          </Stack>
          <DialogContent>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
            {/* <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit">
              Add
            </Button>
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
