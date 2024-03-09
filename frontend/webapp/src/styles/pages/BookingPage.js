import { Box, Typography, styled } from "@mui/material";
import { Colors } from "../theme";

export const BookingPageContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    padding: '10px 20px',
}));

export const FacilityBox = styled(Box)(() => ({
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px 20px',
    margin: '10px 0',
}));

export const FacilityName = styled(Typography)(() => ({
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary, 

}));

export const TimeSlotBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '10px',
}));