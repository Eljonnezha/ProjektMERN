import { Col, Container, Row } from "react-bootstrap";
import AdminMenuProps from "./AdminMenuProps";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'


function AdminMenu() {
  const nav = useNavigate()
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const allMeals = async () => {
      await axios.get("http://localhost:5000/get-menu")
        .then((res) => setMeals(res.data))
        .catch((err) => console.log(err));
    };
    allMeals();
  }, []);

  const handleDelete = async (id) => {
     await axios.delete("http://localhost:5000/delete-menu/" + id)
      .then((res) => setMeals(meals.filter((meal) => meal._id !== id)))
      .catch((err) => console.log(err));
  };
  

  const handleUpdate = (id) => {
    nav("/admin/dashboard/update-item/" + id);
  }

  return (
    <Container>
      <h1 className="text-center my-5">Menu Items</h1>
      <Row className="mb-4 g-4">
        {meals.map((meal) => {
          return (
            <Col key={meal._id} xs={12} sm={6} md={4} lg={3}>
              <AdminMenuProps
                {...meal}
                onDelete={() => handleDelete(meal._id)}
                onUpdate={() => handleUpdate(meal._id)}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default AdminMenu;
