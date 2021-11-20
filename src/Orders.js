import React from 'react'
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";



function Orders() {
  const [{ basket , user }, dispatch] = useStateValue();

    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div>
          {basket.map(item => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
          {/* BasketItem */}
        </div>
            
        </div>
    )
}

export default Orders
