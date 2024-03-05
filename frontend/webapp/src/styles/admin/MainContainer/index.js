import { Box, Button, styled } from "@mui/material";
import "@fontsource/righteous";


export const AdminContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    // height: '100vh',
    maxHeight: '100vh',
    // width: '100vw',
    maxWidth: '100vw',
    justifyContent: 'flex-start',
}));

export const OutletContainer = styled(Box)(() => ({
    maxWidth: '100%',
    width: '100%',
    height: '100%',
}));