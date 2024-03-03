import { Box, Typography, styled } from "@mui/material";
import { Colors } from "../theme";
import "@fontsource/righteous";
import '@fontsource/merriweather';
import { ScaleUpCenter } from "../../animation";

export const MainCarouselImage = styled('img') (({src, theme}) => ({
    src: `url(${src})`,
    height: '100vh',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        height: '40vh',
        width: '100%',
    },
}));

export const HomeContainer = styled(Box) (({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 20px',
    background: Colors.light_gray,
    [theme.breakpoints.down('md')]: {
    },
}));

export const TitleText = styled(Typography) (({theme}) => ({
   color: Colors.primary,
   textAlign: 'center',
    fontFamily: "'Righteous', cursive",
    fontSize: '3rem',
    fontWeight: 'bold',
    padding: '10px 20px',
    [theme.breakpoints.down('md')]: {
        fontSize: '2rem',
        padding: '10px 20px',
    },
}));

export const ItemHeader = styled(Typography, {
    shouldForwardProp: (prop) => prop !== "show",
}) (({show, theme}) => ({
    color: Colors.black,
    textUnderlinePosition: 'under',
    textDecoration: 'underline',
    textDecorationColor: Colors.primary,
    fontFamily: "'merriweather', cursive",
    fontSize: '1.5rem',
    fontWeight: 'bold',
    padding: '50px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        fontSize: '1.2rem',
        padding: '10px',
    },
    animation: show &&  `${ScaleUpCenter} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, 
}));

export const ItemContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "show",
}) (({show}) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '100%',
    // borderWidth: '2px',
    // borderColor: 'green',
    // borderStyle: 'solid',
    margin: 'auto',
    animation: show &&  `${ScaleUpCenter} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, 
}));

export const ItemDescription = styled(Typography) (({theme}) => ({
    color: Colors.dim_grey,
    fontFamily: "'merriweather', cursive",
    textAlign: 'left',
    fontSize: '1rem',
    fontWeight: 'lighter',
    maxWidth: '60%',
    padding: '10px 20px',
    [theme.breakpoints.down('md')]: {
        fontSize: '0.8rem',
        padding: '5px 10px 20px 10px',
        maxWidth: '100%',
    },
}));

export const ItemCarouselImage = styled('img') (({src, theme}) => ({
    src: `url(${src})`,
    height: '300px',
    maxWidth: '400px',
    // padding: '10px 20px',
    [theme.breakpoints.down('md')]: {
        maxHeight: '30vh',
        maxWidth: '70vw',
    },
}));
