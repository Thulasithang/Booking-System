import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { Link, Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function SideBar() {
  const theme = useTheme();
  const [selected, setSelected] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    // <Box sx={{
    //     display: 'flex',
    //     flexDirection: 'row',
    //     }}>
    <Box>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "white",
            height: "100vh",
            borderWidth: "2px",
            borderColor: "#b6c8d9",
            borderStyle: "solid",
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: "#13395e",
                color: "#b6c8d9",
              },
            },
          }}
        >
          <MenuItem component={<Link to="/documentation" />}>
            {" "}
            Documentation
          </MenuItem>
          <SubMenu label="Facilities">
            <MenuItem component={<Link to="/manage/facilities/type" />}>
              Facility Type
            </MenuItem>
            <MenuItem component={<Link to="/manage/facilities" />}>
              Facilities
            </MenuItem>
          </SubMenu>
          <MenuItem component={<Link to="/manage/bookings" />}>
            Booking
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
    // </Box>
  );
}
