import { IconButton } from "@mui/material";
import { NavBarContainer, NavBarHeader, NavBarLogo } from "../../styles/navigation";
import Actions from "./actions";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBarMobile({ isMobile }) {
  return (
    <NavBarContainer>
      <NavBarLogo src="/images/logo.gif" alt="logo" />
      <NavBarHeader variant="h2"> Facility System </NavBarHeader>
      {/* <Actions isMobile= {isMobile}/> */}
      <IconButton>
        <MenuIcon />
      </IconButton>
    </NavBarContainer>
  );
}
