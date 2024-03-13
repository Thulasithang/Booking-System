import { Box } from "@mui/material";
import SideBar from "./navigation/sidebar";
import { Outlet } from "react-router-dom";
import { AdminContainer, OutletContainer } from "../styles/admin/MainContainer";

export default function MainContainer() {
  return (
    <AdminContainer>
      <SideBar />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </AdminContainer>
  );
}
