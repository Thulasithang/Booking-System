import { Button, Divider } from "@mui/material";
import { ActionButton, ActionContainer, NavBarList, NavigationText } from "../../styles/navigation";
import { useNavigate } from "react-router-dom";


export default function Actions ({isMobile}) {
  const navigate = useNavigate();
    return(
      <>
    <NavBarList type = {isMobile? 'block' : 'row'}>
        {/* TODO NavigationButton  */}
        <Button primary="Home" onClick={() => navigate("/")}>
          <NavigationText>Home</NavigationText>
        </Button>
        <Button primary="About" onClick={()=> navigate("/about")}>
          <NavigationText>About Us</NavigationText>
        </Button>
        <Button primary="Services" onClick={() => navigate("/facilities")}>
          <NavigationText>Facilities</NavigationText>
        </Button>
        <Button primary="Contact Us" onClick={() => navigate("/contact")}>
          <NavigationText>Contact Us</NavigationText>
        </Button>
      </NavBarList>
        <ActionContainer>
          <ActionButton onClick={() => navigate("/signup")}>Sign Up</ActionButton>
          <Divider orientation="vertical" flexItem variant="middle" />
          <ActionButton onClick={() => navigate("/login")}>Login</ActionButton>
        </ActionContainer>
      </>
    )
};