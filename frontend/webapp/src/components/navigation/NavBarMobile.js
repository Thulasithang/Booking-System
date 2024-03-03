import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavBarContainer, NavBarHeader, NavBarLogo } from "../../styles/navigation";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBarMobile({ isMobile }) {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/");
  };
  return (
    <NavBarContainer>
      <NavBarLogo src="/images/logo.gif" alt="logo" onClick={handleNavigation}/>
      <NavBarHeader variant="h2" onClick={handleNavigation}> Facility System </NavBarHeader>
      <IconButton>
        <MenuIcon />
      </IconButton>
    </NavBarContainer>
  );
}
