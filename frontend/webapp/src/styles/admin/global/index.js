import { Box, Button, Dialog, DialogTitle, Tab, Typography, styled } from "@mui/material";
import { Colors } from "../../theme";

export const MainContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  maxWidth: "100%",
  width: "100%",
  height: "100%",
  // padding: '10px 20px',
}));

export const HeadContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignContent: "center",
  padding: "10px 20px",
  height: "100%",
}));

export const TitleHeader = styled(Typography)(() => ({
  position: "relative",
  color: Colors.primary,
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",
}));

export const ActionContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
}));

export const ActionButton = styled(Button)(() => ({
  fontWeight: "bold",
  fontFamily: "'Righteous', cursive",
  padding: "10px 20px",
  borderRadius: "10px",
}));

export const ModalContainer = styled(Box)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '60%',
    maxHeight: '80%',
    background: Colors.secondary,
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
}));

export const ModalForm = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignContent: 'center',
    padding: '10px 20px',
    height: '100%',
}));

export const ModalField = styled(Typography)(() => ({
    color: Colors.black,
    // fontFamily: "'merriweather', cursive",
    fontSize: '1rem',
    fontWeight: 'bold',
    textAlign: 'left',
}));

export const DialogContainer = styled(Dialog)(() => ({
  maxWidth: '100%',
  fullWidth: true,
}));

export const DialogHeader = styled(DialogTitle)(() => ({
  color: Colors.primary,
  fontSize: '2rem',
  fontWeight: 'bold',
  padding: '5px 20px',
}));

export const CancelButton = styled(Button)(() => ({
  fontWeight: 'bold',
  fontFamily: "'Righteous', cursive",
  padding: '10px 20px',
  borderRadius: '10px',
  color: Colors.danger,
  "&:hover": {
    background: Colors.danger,
    color: Colors.white,
  },
}));

export const AddButton = styled(Button)(() => ({
  fontWeight: 'bold',
  fontFamily: "'Righteous', cursive",
  padding: '10px 20px',
  borderRadius: '10px',
  background: Colors.primary,
}));

export const TimeTableContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: '10px 10px',
  height: '100%',
}));

export const TimePickerContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'center',
  maxWidth: '60%',
  maxHeight: 50,
}));

export const TabContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  maxWidth: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  padding: '10px 10px',
  height: '100%',
}));

export const CustomTab = styled(Tab)(() => ({
  fontFamily: "'Righteous', cursive",
  color: Colors.primary,
  "&.Mui-selected": {
    color: Colors.primary,
    fontWeight: 'bold',
  },
}));