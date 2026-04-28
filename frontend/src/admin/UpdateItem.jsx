import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const UpdateItem = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [updateItem, setUpdateItem] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const oneItem = async () => {
      await axios
        .get("http://localhost:5000/get-menu/" + id)
        .then((res) => setUpdateItem(res.data))
        .catch((err) => console.log(err));
    };
    oneItem();
  }, [id]);

  const handleChange = (e) => {
    setUpdateItem({ ...updateItem, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setUpdateItem({ ...updateItem, photo: file });
    setUploadedImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(updateItem).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await axios
      .patch("http://localhost:5000/update-menu/" + id, formData)
      .then((res) => nav("/admin/dashboard/admin-menu"))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="my-5">
      <Form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-50 mx-auto p-4 bg-light rounded shadow "
      >
        <h1 className="text-center fs-2">Update Item</h1>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={updateItem.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={updateItem.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            accept=".jpeg, .png, .jpg"
            name="photo"
            onChange={handlePhoto}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={updateItem.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="me-auto d-block">
          Update Item
        </Button>
        
        {uploadedImage ? (
        <Image
          src={uploadedImage}
          alt="Preview"
          rounded
          className="img-fluid mt-3"
        />
      ) : updateItem.photo ? (
        <Image
          src={`http://localhost:5000/images/${updateItem.photo}`}
          alt="Existing"
          rounded
          width={300}
          className="img-fluid my-5"
        />
      ) : null}
      </Form>
    </Container>
  );
};

export default UpdateItem;
