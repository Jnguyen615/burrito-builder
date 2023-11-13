import { useState, useEffect } from "react";

function OrderForm(props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState("");

  function clearInputs() {
    setName("");
    setIngredients([]);
  }

  const handleInputChange = e => {
    const input = e.target.value.toLowerCase();
    setInput(input);
  };

  useEffect(() => {
    console.log('ingredients1:', ingredients)
  }, [ingredients])

  const handleMultipleIngredients = (e, ingredient) => {
    e.preventDefault();
    setIngredients([...ingredients, ingredient])
    console.log('ingredients', ingredients) 
  //i want beans added to array
}
  function handleSubmit(e) {
    e.preventDefault();
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
        <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>
      </form>
      <button type="button" onClick={e => handleSubmit(e)}>
        Submit Order
      </button>
    </div>
  );
}

export default OrderForm;

//when a user clicks, what are they clicking, what do you want to handle? 
//user clicked beans - i want it added to an ingredents