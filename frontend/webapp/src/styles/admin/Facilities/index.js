import { Button, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Colors } from "../../theme";


export const ManageFacilityContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    // padding: '10px 20px',
})); 

export const TitleHeader = styled(Typography) (() => ({
    color: Colors.primary,
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
}));

export const ActionContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
}));

export const ActionButton = styled(Button)(() => ({
    fontWeight: 'bold',
    fontFamily: "'Righteous', cursive",
    padding: '10px 20px',
    borderRadius: '10px',
}));