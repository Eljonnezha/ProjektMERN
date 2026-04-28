import { Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function Messages() {

    const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesInfo = async () => {
      await axios
        .get("http://localhost:5000/getContacts")
        .then((res) => setMessages(res.data))
        .catch((err) => console.log("Not read messages: " + err));
    };
    messagesInfo();
  }, []);

  const deleteMessages = async (id) => {
    await axios.delete("http://localhost:5000/deleteContact/"+ id)
    .then(res => setMessages(messages.filter((message) => message._id !== id)))
    .catch((err) => console.log("Not delete message: " + err));
  }

    return (
        <Container className="my-5">
      <h1 className="text-center my-5">Table Message</h1>
      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => {
            return (
              <tr key={message._id}>
                <td>{index + 1}</td>
                <td>{message.fullName}</td>
                <td>{message.email}</td>
                <td>{message.subject}</td>
                <td>{message.message}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteMessages(message._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>

    )
}

export default Messages;