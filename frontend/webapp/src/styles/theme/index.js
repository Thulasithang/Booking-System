import { createTheme } from '@mui/material/styles';

export const Colors = {
  primary: "#62058A",
  secondary: "#DEC0FF",
  success: "#4CAF50",
  info: "#00a2ff",
  danger: "red",
  warning: "#FFC107",
  dark: "#ee1b20",
  light: "#aaa",
  muted: "#abafb3",
  border: "#DDDFE1",
  inverse: "#2F3D4A",
  shaft: "#333",
  ////////////////
  // Grays
  ////////////////
  dim_grey: "#696969",
  dove_gray: "#d5d5d5",
  body_bg: "#f3f6f9",
  light_gray: "rgb(230,230,230)",
  ///////////////
  // Solid Color 
  ///////////////
  white: "#fff",
  black: "#000",
};

const theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary,
        },
        secondary: {
            main: Colors.secondary,
        }
    },

    components: {
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableElevation: true,
            }
        },
    }

})

export default theme;