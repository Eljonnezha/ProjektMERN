import { useEffect, useState } from "react";
import { Container, Table, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = async () => {
      await axios
        .get("http://localhost:5000/getOrders")
        .then((res) => setOrders(res.data))
        .catch((err) => console.log("Error getting orders:" + err));
    };
    allOrders();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:5000/deleteOrder/" + id)
      .then((res) => setOrders(orders.filter((order) => order._id !== id)))
      .catch((err) => console.log("Error deleting order:" + err));
  };

  const updateStatus = async (id) => {
    await axios
      .put("http://localhost:5000/updateOrderStatus/" + id)
      .then((res) =>
        setOrders(orders.map((order) => (order._id === id ? res.data : order))),
      )
      .catch((err) => console.log("Error updating order status:" + err));
  };

  return (
    <Container className="my-5 ">
      <h2 className="mb-4 text-center">Orders</h2>
      <Table striped bordered hover responsive className="text-center">
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
            <th>Order Date</th>
            <th>Status</th>
            <th>Action</th>
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
                <ul>
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} x {item.quantity} 
                    </li>
                  ))}
                </ul>
              </td>
              <td>{new Date(order.orderDate).toLocaleString()}</td>
              <td>{order.status}</td>
              <td>
                <Row className="d-flex flex-column g-2">
                  <Col>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(order._id)}
                    >
                      Delete
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="success"
                      onClick={() => updateStatus(order._id)}
                    >
                      Complete
                    </Button>
                  </Col>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Orders;
