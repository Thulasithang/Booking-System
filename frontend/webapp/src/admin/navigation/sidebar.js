import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MailIcon from "@mui/icons-material/Mail";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, Outlet } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";

// export default function SideBar() {
//   const theme = useTheme();
//   const [selected, setSelected] = useState("Dashboard");
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     // <Box sx={{
//     //     display: 'flex',
//     //     flexDirection: 'row',
//     //     }}>
//     <Box>
//       <Sidebar
//         rootStyles={{
//           [`.${sidebarClasses.container}`]: {
//             backgroundColor: "white",
//             height: "100vh",
//             borderWidth: "2px",
//             borderColor: "#b6c8d9",
//             borderStyle: "solid",
//           },
//         }}
//       >
//         <Menu
//           menuItemStyles={{
//             button: {
//               // the active class will be added automatically by react router
//               // so we can use it to style the active menu item
//               [`&.active`]: {
//                 backgroundColor: "#13395e",
//                 color: "#b6c8d9",
//               },
//             },
//           }}
//         >
//           <MenuItem component={<Link to="/documentation" />}>
//             {" "}
//             Documentation
//           </MenuItem>
//           <SubMenu label="Facilities">
//             <MenuItem component={<Link to="/manage/facilities/type" />}>
//               Facility Type
//             </MenuItem>
//             <MenuItem component={<Link to="/manage/facilities" />}>
//               Facilities
//             </MenuItem>
//           </SubMenu>
//           <MenuItem component={<Link to="/manage/bookings" />}>
//             Booking
//           </MenuItem>
//         </Menu>
//       </Sidebar>
//     </Box>
//     // </Box>
//   );
// }
const drawerWidth = 240;

export default function SideBar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Toolbar /> */}
        <Divider />
        <List>
          <ListItemButton onClick={handleClick}>
            {/* <ListItemIcon>
              <InboxIcon />
            </ListItemIcon> */}
            <ListItemText primary="Manage Facilities" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => {navigate("/manage/facilities/type")}}>
                {/* <ListItemIcon>
                  <StarBorder />
                </ListItemIcon> */}
                <ListItemText primary="Facility Types" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => {navigate("/manage/facilities")}}>
                {/* <ListItemIcon>
                  <StarBorder />
                </ListItemIcon> */}
                <ListItemText primary="Facilities" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>

        <List>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary="Manage Coaching" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => {navigate("/manage/coaches")}}>
                <ListItemText primary="Coaches" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => {navigate("/manage/")}}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Facilities" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>

        {/* </List> */}
        <Divider />
      </Drawer>
    </Box>
  );
}
