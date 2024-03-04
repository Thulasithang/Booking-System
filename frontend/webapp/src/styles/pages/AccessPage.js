import { Box, Button, Container, FormControl, Typography, styled } from "@mui/material";
import "@fontsource/merriweather";
import { Colors } from "../theme";

export const AccessPageContainer = styled(Container) (({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 20px',
    background: 'white',
    [theme.breakpoints.down('md')]: {
        background: 'white',
        padding: '10px 10px',
        },
}));

export const MainContainer = styled(Box) (({theme}) => ({
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
}));    

export const ImageContainer = styled('img') (({src, theme}) => ({
    src: `url(${src})`,
    height: '80vh',
    width: '60%',
    objectFit: 'cover',
    [theme.breakpoints.down('md')]: {
        display: 'none',
        },
}));

export const TitleText = styled(Typography) (({theme}) => ({
    fontFamily: "'merriweather', cursive",
    color: Colors.primary,
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    [theme.breakpoints.down('md')]: {
        fontSize: '1.5rem',
        },
}));

export const FormContainer = styled(Box) (({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    padding: '10px 20px',
    width: '50%',
    maxWidth: '50%',
    background: Colors.light_gray,
    [theme.breakpoints.down('md')]: {
        width: '100%',
        maxWidth: '100%',
        padding: '10px 20px',
        borderRadius: '10px',
        },
}));

export const Form = styled(FormControl) (({theme}) => ({
}));

export const SubmitButton = styled(Button) (() => ({
    margin: '20px 0',
    background: Colors.primary,
    color: 'white',
    '&:hover': {
        background: Colors.primary_dark,
    },
}));