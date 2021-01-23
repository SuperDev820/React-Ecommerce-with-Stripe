import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const TakeMoney = ({total, handleCheckout, products}) => {

  const handleToken = async (token, addresses) =>  {
    const response = await axios.post(
      "api/orders/stripecheckout",
      { token, products }
    );
    const { status, address, recipient, paymentMethod, paymentResult } = response.data;
    if (status === "success") {
      handleCheckout(address, recipient, paymentMethod, paymentResult)
      // toast("Success! Check email for details", { type: "success" });
    } else {
      // toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div>
      <StripeCheckout
        token={handleToken}
        billingAddress
        shippingAddress
        amount={total * 100}
        name="Auto Pars Order"
        stripeKey="pk_test_51I6dCcBxSq4757fM5xbrRDOCchQI8e2TORqleN6nkHoLHHHr4rKLSgPt25nPsESGmPk7LhqeUzvI1ibjT2sh8nV200cIozOeDf"
      />
    </div>
  )
}

export default TakeMoney