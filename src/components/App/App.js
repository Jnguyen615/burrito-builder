import { useEffect, useState } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {

  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')
  
  const fetchOrders = () => {
    fetch('http://localhost:3001/api/v1/orders')
    .then((response) => {
      if(!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      return response.json()
    })
    .then(data => {
      console.log('data', data)
      setOrders(data)
    })
    .catch((error) => setError(error.message))
  }

  const newOrder = (orderData) => {
    return fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
  };
  
  // Example usage:
  const orderData = {
    name: 'NewCustomer',
    ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno'],
  };
  
  newOrder(orderData)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('New order created:', data);
    })
    .catch(error => {
      console.error('Error creating order:', error);
    });
  

  useEffect(() => {
    fetchOrders()
  }, []);

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm setOrders={setOrders}/>
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
