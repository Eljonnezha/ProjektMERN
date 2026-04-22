import { Route, Routes } from "react-router-dom";
import SecondNavbar from "./SecondNavBar.jsx";
import Messages from "./Messages.jsx";
import AddItem from "./AddItem.jsx";
import AdminMenu from "./AdminMenu.jsx";
import Orders from "./Orders.jsx";
import UpdateItem from "./UpdateItem.jsx";
import Users from "./Users.jsx";

function AdminDashboard() {
  return (
    <div>
      <SecondNavbar />

      <Routes>
        <Route path="add-item" element={<AddItem />} />
        <Route path="admin-menu" element={<AdminMenu />} />
        <Route path="update-item/:id" element={<UpdateItem />} />
        <Route path="orders" element={<Orders />} />
        <Route path="messages" element={<Messages />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default AdminDashboard;
