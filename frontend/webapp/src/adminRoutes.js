import FacilitiesEditPage from "./admin/pages/FacilitiesEditPage";
import ManageFacilities from "./admin/pages/ManageFacilities";
import ManageFacilityType from "./admin/pages/ManageFacilityType";


const AdminRoutes = [ 
    {
        id: 1,
        path: "/manage",
        element: <h1>Admin Dashboard</h1>,
    },
    {
        id: 2,
        path: "/manage/facilities",
        element: <ManageFacilities />,
    },
    {
        id: 3,
        path: "/manage/bookings",
        element: <h1>Manage Bookings</h1>,
    },
    {
        id: 4,
        path: "/manage/facilities/type",
        element: <ManageFacilityType/>,
    },
    {
        id: 5,
        path: "/manage/facilities/:id",
        element: <FacilitiesEditPage />,
    }
];

export default AdminRoutes;