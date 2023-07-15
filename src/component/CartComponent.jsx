import React, { useState, useEffect } from "react";
import { CartState } from "../context/Context";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { BsCurrencyRupee } from "react-icons/bs";
import Rating from "./Rating";
import EmptyCart from "../assets/empty-cart.svg";

import {
  AiFillDelete,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CartComponent = () => {
  const navigation = useNavigate();
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);
  if (!cart.length > 0) {
    return (
      <div className="  d-flex flex-column  empty-cart justify-content-center align-items-center ">
        <img src={EmptyCart} style={{ height: 300, width: "80%" }} />
        <h2 style={{ padding: 10 }}>Cart is Empty</h2>
        <p>Please add some Items in your cart.</p>
      </div>
    );
  }
  return (
    <div className="d-flex productMainContainer  justify-content-between container my-3 gap-5">
      <div className="productContainer ">
        <ListGroup>
          {cart.map((prod) => (
            <div className="shadow my-2" key={prod.id}>
              <Row className=" cart-row  px-2  py-3 box-shadow flex justify-center align-items-center text-center  ">
                <Col md={2}>
                  <Image
                    className="crtimg shadow-lg rounded"
                    src={prod.images[0]}
                    alt={prod.title}
                    fluid
                    rounded
                  />
                </Col>
                <Col md={2}>
                  <span className="font-bolder mt-2" style={{ fontSize: 25 }}>
                    {prod.title}
                  </span>
                </Col>
                <Col md={2}>
                  <BsCurrencyRupee /> {prod.price}
                </Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <p className="mb-0 py-1 ">
                    <AiFillPlusCircle
                      onClick={() =>
                        dispatch({
                          type: "INCREASE_QTY",
                          payload: {
                            id: prod.id,
                            qty: prod.qty,
                          },
                        })
                      }
                      className="text-primary qty-change"
                      size={25}
                    />
                    <span>
                      <b> {prod.qty}</b>{" "}
                    </span>
                    <AiFillMinusCircle
                      onClick={() =>
                        dispatch({
                          type: "DECREASE_QTY",
                          payload: {
                            id: prod.id,
                            qty: prod.qty,
                          },
                        })
                      }
                      className="text-primary qty-change"
                      size={25}
                    />
                  </p>
                </Col>{" "}
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20" />
                  </Button>
                </Col>
              </Row>
            </div>
          ))}
        </ListGroup>
      </div>
      <div className="d-flex  checkout  rounded  shadow-lg flex-column align-items-center bg-dark p-3  text-center flex-1">
        <span className="text-white title">Total ({cart.length}) Items</span>
        <span
          className="text-white title py-3"
          style={{ fontWeight: 700, fontSize: 20 }}
        >
          Total : <BsCurrencyRupee />
          {total}
        </span>
        <button
          onClick={() => navigation("/orderPlaced")}
          type="button"
          className="btn btn-primary"
          disabled={cart.lenght === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
