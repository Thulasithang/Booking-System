import { Box, Button, List, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@fontsource/righteous";
import { Colors } from "../theme";


export const NavBarContainer = styled(Box) (({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    background: Colors.secondary,
    [theme.breakpoints.down('md')]: {
        justifyContent: 'space-between',
        padding: '10px 0px 10px 0px',
    },
}));

export const NavBarLogo = styled('img') (({src, theme}) => ({
    src: `url(${src})`,
    height: '80px',
    width: '70px',
    [theme.breakpoints.down('md')]: {
        height: '40px',
        width: '40px',
    },
}));

export const NavBarHeader = styled(Typography) (({theme}) => ({
    fontSize: '1.5rem',
    flexGrow: 1,
    fontFamily: "'Righteous', cursive",
    color: Colors.primary,
    [theme.breakpoints.down('md')]: {
        flexGrow: 0,
        fontSize: '1rem',
    },
}));

export const NavBarList = styled(List) (({type, theme}) => ({
    display: type ==='row' ? 'flex' : 'block',
    flexGrow: 1,
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

export const NavigationButton = styled(Button) (() => ({
    color: Colors.info,

}));

export const NavigationText = styled(Typography) (() => ({
    color: Colors.primary,
    fontWeight: 'bold',
    fontFamily: "'Righteous', cursive", 
}));

export const ActionContainer = styled(Box) (({theme}) => ({
    background: Colors.secondary,
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: '10px 20px',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        flexGrow: 0,

    },

}));

export const ActionButton = styled(Button) (() => ({
    fontWeight: 'bold',
    fontFamily: "'Righteous', cursive",
    padding: '10px 20px',
    borderRadius: '10px',
}));
