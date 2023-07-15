import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { BsCurrencyRupee } from "react-icons/bs";
import { CartState } from "../context/Context";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="products shadow-lg">
      <Card>
        <Card.Img
          variant="top"
          className="img shadow-sm border-primary"
          src={prod.images[0]}
          alt={prod.name}
        />
        <Card.Body>
          <Card.Title>{prod.title}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>
              <BsCurrencyRupee />
              {prod.price * 82}
            </span>
            <br></br>
            <Rating className="star" rating={prod.rating} />
          </Card.Subtitle>

          {cart.some((p) => p.id === prod.id) ? (
            <Button
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                });
              }}
              variant="danger"
            >
              Remove from cart
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                });
              }}
              disabled={!prod.stock}
            >
              {!prod.stock ? "Out of Stock" : "Add to cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
