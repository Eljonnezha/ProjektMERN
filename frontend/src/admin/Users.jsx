import { Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Users() {
  const nav = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const allUsers = async () => {
      await axios
        .get("http://localhost:5000/users", { withCredentials: true })
        .then((res) => setUsers(res.data))
        .catch((err) => console.log("Error getting users:" + err));
    };
    allUsers();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:5000/user/" + id)
      .then(() => setUsers(users.filter((user) => user._id !== id)))
      .catch((err) => console.log("Error deleting user:" + err));
  };

  const handleResetPassword = async (id) => {
    nav("/admin/dashboard/reset-password/" + id);
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Users</h1>
      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td className="d-flex justify-content-center gap-2">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => handleResetPassword(user._id)}
                >
                  Reset Password
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Users;
