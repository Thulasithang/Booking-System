import { Box, Button, Typography, styled } from "@mui/material";
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

export const TitleHeader = styled(Typography)(() => ({
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
    fontFamily: "'merriweather', cursive",
    fontSize: '1rem',
    fontWeight: 'bold',
    textAlign: 'left',
}));
