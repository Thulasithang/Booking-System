import { Box, Button, Typography, styled } from "@mui/material";
import { Colors } from "../theme";


export const FacilitiesContainer = styled(Box) (({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    // padding: '10px 20px',
    [theme.breakpoints.down('md')]: {
        // background: 'white',
        padding: '10px 10px',
        },
}));

export const MainHeader = styled(Typography) (({theme}) => ({
    color: Colors.secondary,
    fontFamily: "'merriweather', cursive",
    fontSize: '3rem',
    fontWeight: 'bold',
    textDecoration: 'underline',
    textDecorationColor: Colors.primary,
    padding: '10px 20px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        fontSize: '1.5rem',
        padding: '10px',
    },
}));

export const FacilityContainer = styled(Box) (({direction, theme}) => ({
    display: 'flex',
    alignSelf: direction === "left" ? 'flex-start' : 'flex-end',
    flexDirection: 'row',
    padding: '10px 20px',
    marginTop: '20px',
    // background: Colors.muted,
    height: '60vh',
    width: '70%',
    maxWidth: '70%',
    [theme.breakpoints.down('xl')]: {
        width: '80%',
        maxWidth: '80%',
        padding: '10px 00px',
    },
    [theme.breakpoints.down('lg')]: {   
        width: '90%',
        maxWidth: '90%',
        padding: '10px 00px',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignSelf: 'center',
        marginBottom: '20px',
        height: 'auto',
        padding: 0,
        width: '100%',
        maxWidth: '100%',
    },
}));

export const FacilityImage = styled('img') (({src, theme}) => ({
    src: `url(${src})`,
    height: '60vh',
    width: '50%',
    alignContent: 'center',
    alignSelf: 'center',
    // margin: '10px 20px',
    objectFit: 'fill',

    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    // padding: '10px 20px',
    [theme.breakpoints.down('md')]: {
        borderBottomLeftRadius: 0,
        borderTopRightRadius: '10px',
        maxHeight: '100%',
        maxWidth: '100%',
        width: '100vw',
        objectFit: 'cover',
        margin: '10px 0px 0px 0px'
    },
}));

export const FacilityContent = styled(Box) (({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    padding: '10px 20px',
    width: '60%',
    maxWidth: '60%',
    borderEndEndRadius: '10px',
    borderTopRightRadius: '10px',
    background: Colors.muted,
    [theme.breakpoints.down('lg')]: {
        padding: '10px 0 20px 10px',
        width: '100%',
        maxWidth: '100%',
    },
    [theme.breakpoints.down('md')]: {
        borderTopRightRadius: 0,
        borderBottomLeftRadius: '10px',
        alignSelf: 'center',
        maxHeight: '100%',
        maxWidth: '100%',
        width: '100%',
        padding: '10px 0px 20px 0px',
    },
}));

export const ContentHeader = styled(Typography) (({theme}) => ({
    color: Colors.secondary,
    fontFamily: "'merriweather', cursive",
    textUnderlinePosition: 'under',
    textDecoration: 'underline',
    textDecorationColor: Colors.primary,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    padding: '10px 20px',
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
        // fontSize: '1.2rem',
        padding: '10px',
        textAlign: 'center',
    },
}));

export const ContentDescription = styled(Typography) (({theme}) => ({
    color: Colors.shaft,
    fontFamily: "'merriweather', cursive",
    maxWidth: '80%',
    textAlign: 'left',
    fontSize: '1rem',
    fontWeight: 'lighter',
    padding: '10px 20px',
    [theme.breakpoints.down('xl')]: {
        maxWidth: '90%',
        padding: '10px 10px',
        textAlign: 'justify',
    },
    [theme.breakpoints.down('lg')]: {
        maxWidth: '90%',
        fontSize: '0.9rem',
        padding: '10px 10px',
        textAlign: 'justify',
    },
    [theme.breakpoints.down('md')]: {
        maxWidth: '90%',
        fontSize: '0.9rem',
        padding: '5px 10px 20px 10px',
        textAlign: 'justify',
    },
}));

export const FacilityBookButton = styled(Button)(() =>({
    maxWidth: '200px',
    alignSelf: 'center',
    bottom: 0,
    borderRadius: '10px',
    fontWeight: 'bold',

}))
