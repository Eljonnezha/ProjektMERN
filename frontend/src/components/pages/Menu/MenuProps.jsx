import { Image, Button, Alert } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../Authentication/UserContext.jsx";

function MenuProps({ photo, name, description, price, addToCart }) {
  // marrim info nese useri nese eshte i loguar ose jo nga UserContext
  const { userInfo } = useContext(UserContext);
  // shfaqim alert nese useri nuk eshte i loguar dhe tenton te shtoje ne cart pa u loguar
  const [showAlert, setShowAlert] = useState(false);

  // fshehim alert pas 4 sek nese eshte shfaqur
 useEffect(() => {
  if (showAlert) {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 4000);

    return () => clearTimeout(timer);
  }
}, [showAlert]);
  return (
    <div className="card border-0 shadow-sm">
      <Image
        src={"http://localhost:5000/images/" + photo}
        alt={name}
        className="card-img-top img-fluid"
      />
      <div className="card-body d-flex flex-column bg-light">
        <h5 className="card-title">{name}</h5>
        <p className="card-text flex-grow-1">{description}</p>
        <p className="card-text fw-bold">{price} €</p>
        <Button
          variant="danger"
          className="mt-auto mb-2"
          // kontrollojme nese useri eshte i loguar, nese jo shfaqim alert dhe item nuk shtohen ne cart, nese po item shtohen ne cart
          onClick={() => {
            if (!userInfo.email) {
              setShowAlert(true);
              return;
            }
            addToCart({ name, price });
          }}
        >
          Shto në <i className="bi bi-cart ms-2"></i>
        </Button>
        {showAlert && (
          <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
            Ju lutem logohuni për të shtuar artikuj në cart.
          </Alert>
        )}
      </div>
    </div>
  );
}

export default MenuProps;
