import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getOrders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log("Error getting orders:" + err));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete('http://localhost:5000/deleteOrder/' + id)
    .then(() => setOrders(orders.filter(order => order._id !== id)))
    .catch((err) => console.log("Error deleting order:" + err));
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Orders</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>City</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.fullName}</td>
              <td>{order.email}</td>
              <td>{order.address}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.city}</td>
              <td>{order.totalAmount} €</td>
              <td>{order.paymentMethod}</td>
              <td>
                {order.items.map((item, i) => (
                  <div key={i}>
                    {item.name} x {item.quantity}
                  </div>
                ))}
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(order._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Orders;
