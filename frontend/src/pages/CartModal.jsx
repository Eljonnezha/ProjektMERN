import { Modal, Button } from "react-bootstrap";

function CartModal({
  show,
  handleClose,
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  openCheckout,
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {cart.length === 0 ? (
          <p>No items</p>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center mb-3"
            >
              <span>{item.name}</span>

              <span>{item.price * item.quantity} €</span>

              <div className="d-flex align-items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => decreaseQuantity(item.name)}
                >
                  -
                </Button>

                <span>{item.quantity}</span>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => increaseQuantity(item.name)}
                >
                  +
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => removeFromCart(item.name)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}

        <hr />
        <h5>Total: {total} €</h5>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button variant="danger" onClick={openCheckout}>Checkout</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;
