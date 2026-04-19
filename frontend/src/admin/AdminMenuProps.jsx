import { Image, Button, Col, Row } from "react-bootstrap";

function AdminMenuProps({
  photo,
  name,
  description,
  price,
  onDelete,
  onUpdate,
}) {
  return (
    <div className="card border-0 shadow-sm">
      <Image
        src={`http://localhost:5000/images/${photo}`}
        alt={name}
        className="card-img-top img-fluid"
      />
      <div className="card-body d-flex flex-column bg-light">
        <h5 className="card-title">{name}</h5>
        <p className="card-text flex-grow-1">{description}</p>
        <p className="card-text fw-bold">{price} €</p>

        <Row>
          <Col md={6}>
            <Button variant="primary" className="mt-auto" onClick={onUpdate}>
              Edit <i className="bi bi-pencil ms-2"></i>
            </Button>
          </Col>
          <Col md={6}>
            <Button variant="danger" className="mt-auto" onClick={onDelete}>
              Delete <i className="bi bi-trash ms-2"></i>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AdminMenuProps;
