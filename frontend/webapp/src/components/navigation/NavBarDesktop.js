import {
  Alert,
  Button,
  Divider,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  ActionButton,
  ActionContainer,
  NavBarContainer,
  NavBarHeader,
  NavBarList,
  NavBarLogo,
  NavigationText,
} from "../../styles/navigation";
import { useNavigate } from "react-router-dom";
import Actions from "./actions";

const pages = [
  { name: "Home", href: "/" },
  { name: "About", href: "about" },
  { name: "Services", href: "services" },
];

export default function NavBarDesktop({isMobile}) {
  return (
    <NavBarContainer>
      <NavBarLogo src="/images/logo.gif" alt="logo" />
      <NavBarHeader variant="h2"> Facility System </NavBarHeader>
      <Actions isMobile={isMobile}/>
    </NavBarContainer>
  );
}
