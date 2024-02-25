import { Button, Divider } from "@mui/material";
import { ActionButton, ActionContainer, NavBarList, NavigationText } from "../../styles/navigation";


export default function Actions ({isMobile}) {
    return(
    <NavBarList type = {isMobile? 'block' : 'row'}>
        {/* TODO NavigationButton  */}
        <Button primary="Home" href={"/"}>
          <NavigationText>Home</NavigationText>
        </Button>
        <Button primary="About" href={"/about"}>
          <NavigationText>About Us</NavigationText>
        </Button>
        <Button primary="Services" href={"/facilities"}>
          <NavigationText>Facilities</NavigationText>
        </Button>
        <Button primary="Contact Us" href={"/contact"}>
          <NavigationText>Contact Us</NavigationText>
        </Button>
        <ActionContainer>
          <ActionButton>Sign Up</ActionButton>
          <Divider orientation="vertical" flexItem variant="middle" />
          <ActionButton>Login</ActionButton>
        </ActionContainer>
      </NavBarList>
    )
};