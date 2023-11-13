import { useState, useEffect } from "react";

function OrderForm( {setOrders, orders} ) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [formIsFilled, setFormIsFilled] = useState('false')
  const [error, setError] = useState('')
  
  const newOrder = (order) => {
    return fetch('http://localhost:3001/api/v1/orders', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('New order created:', data);
        return data;
      })
      .catch(error => {
        console.error('Error creating order:', error);
        throw error;
      });
  };
  
  

  function clearInputs() {
    setName("");
    setIngredients([]);
  }

  const handleInputChange = e => {
    const input = e.target.value.toLowerCase();
    setName(input);
  };

  useEffect(() => {
    if(name.length && ingredients.length) {
      setFormIsFilled(true)
    } else {
      setFormIsFilled(false)
    }
  }, [name, ingredients])

 


  const handleMultipleIngredients = (e, ingredient) => {
    e.preventDefault();
    setIngredients([...ingredients, ingredient])
    console.log('ingredients', ingredients) 
  //i want beans added to array
}
const handleSubmit = (e) => {
  e.preventDefault();
  if (formIsFilled) {
    let order = {
      name,
      ingredients,
    };
    newOrder(order)
      .then((response) => {
        setOrders((prevOrders) => ({
          ...prevOrders,
          orders: [...prevOrders.orders, response],
        }));
        clearInputs();
      })
      .catch((error) => console.log(error));
  } else {
    setError(true);
  }
}

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

  const ingredientButtons = possibleIngredients.map((ingredient, index) => {
    return (
      <button
        key={index}
        name={ingredient}
        multiple
        value={ingredients}
        onClick={e => handleMultipleIngredients(e, ingredient)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <div className="form-box">
      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={e => handleInputChange(e)}
        />

        {ingredientButtons}
        {!ingredients || !name && <p>Please select at least one ingredient and enter a name for the order.</p>}
        <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>
      </form>
      <button type="button" onClick={e => handleSubmit(e)}>
        Submit Order
      </button>
    </div>
  );
}

export default OrderForm;
