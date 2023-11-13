import React from "react";
import "./Orders.css";

const Orders = ( {orders, index, id} ) => {
  const orderEls =  Array.isArray(orders.orders) && orders.orders.map((order) => {
    return (
      <div className="order" key={order.id}>
      <h3>{order.name}</h3>
      <ul className="ingredient-list">
        {Array.isArray(order.ingredients) && order.ingredients.map((ingredient, ingredientIndex) => {
          const uniqueKey = `${order.id}-${ingredientIndex}`;
          return <li key={uniqueKey}>{ingredient}</li>;
        })}
        </ul>
      </div>
    );
  });

  return (
    <section>{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
  );
};

export default Orders;
