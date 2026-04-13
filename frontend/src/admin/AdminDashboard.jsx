import { Route, Routes } from "react-router-dom";
import Sidebar from "./SideBar.jsx";
import Messages from "./Messages.jsx";
import AddItem from "./AddItem.jsx";
import AdminMenu from "./AdminMenu.jsx";
import Orders from "./Orders.jsx";

function AdminDashboard() {
  return (
    <div>
      <Sidebar />

      <Routes>
        <Route path="orders" element={<Orders />} />
        <Route path="messages" element={<Messages />} />
        <Route path="add-item" element={<AddItem />} />
        <Route path="admin-menu" element={<AdminMenu />} />
      </Routes>
    </div>
  );
}

export default AdminDashboard;
