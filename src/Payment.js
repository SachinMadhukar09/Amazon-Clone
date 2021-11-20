import React, { useState, useEffect } from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { db } from "./Firebase";
import instance from "./axios";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState();

  // useEffect(() => {
  //   //Generate the special stripe secret which allows us to charge a customer
  //   const getClientSecret = async () => {
  //     const response = await instance({
  //       method: "post",
  //       // Stripe expects the total in a currencies subunits
  //       url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
  //     });

  //     setClientSecret(response.data.clientSecret);
  //   };
  //   // console.log("Here it is ",clientSecret);
  //   getClientSecret();
  // }, [basket]);

  // console.log("The Secret is >>>>", clientSecret);
  // console.log("person" , user)
  const handleSubmit = async (event) => {
    history.replace("/orders");

    //do all the fancy stripe stuff..
    // event.preventDefault();
    // setProcessing(true);
    // const payload = await stripe
    //   .confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: elements.getElement(CardElement),
    //     },
    //   })
    //   .then(({ paymentIntent }) => {
        // PaymentIntent = payment Confirmation

        // db
        //   .collection('users')
        //   .doc(user.uid)
        //   .collection("orders")
        //   .doc(paymentIntent.id)
        //   .set({
        //     basket: basket,
        //     amount: paymentIntent.amount,
        //     created: paymentIntent.created,
        //   });

        //   console.log("payment" , paymentIntent)
        // setSucceeded(true);
        // setError(null);
        // setProcessing(false);
        // dispatch({
        //   type: "EMPTY_BASKET",
        // });
        // history.replace("/orders");
      // });
  };

  const handleChange = (event) => {
    //Listen for the change in the cardelement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (
          <Link to="/heckout">
            {basket?.length}
            items
          </Link>
          )
        </h1>
        {/* Delievery Address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delievery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles</p>
          </div>
        </div>

        {/* Review Items */}

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delievery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* Payment methos */}

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total : {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
