import React from 'react'
import CurrencyFormat from 'react-currency-format'
import './Subtotal.css'

function Subtotal() {
    return (
        <div className="subtotal">
            <CurrencyFormat 
            renderText={(value) => (
                <>
                <p>
                    Subtotal (0 items):<strong>0</strong>
                </p>
                <small className="subtotal__gift" >
                    <input type="checkbox" />Thiis order contains gift
                </small>
            </>
            )}
            decimalScale={2}
            value={0}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            />

            <button>Proceed To Checkout</button>
            
        </div>
    )
}
export default Subtotal