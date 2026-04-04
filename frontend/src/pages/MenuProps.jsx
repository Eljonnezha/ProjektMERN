import { Image, Button } from "react-bootstrap";

function MenuProps({ image, name, description, price }) {
  return (
    <div className="card border-0 shadow-sm">
      <Image
        src={image}
        className="card-img-top img-fluid"
        alt={name}
        
      />
      <div className="card-body d-flex flex-column bg-light">
        <h5 className="card-title">{name}</h5>
        <p className="card-text flex-grow-1">{description}</p>
        <p className="card-text fw-bold">{price} €</p>
        <Button variant="danger" className="mt-auto">
          Add to Cart <i className="bi bi-cart ms-2"></i>
        </Button>
      </div>
    </div>
  );
}

export default MenuProps;
