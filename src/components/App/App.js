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
  
  useEffect(() => {
    fetchOrders()
  }, []);

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm />
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
