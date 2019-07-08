import React from "react";
import { Link } from "react-router-dom";

const AddedBooks = ({ data, item }) => {
   const { substractionItem, additionItem, deleteItem } = data;
   const { id, price, cover, title, count, total } = item;
   return (
      <div className="addedToBasketBook">
         <div className="title">
            <img src={cover} alt="cover" />
            <h6>{title}</h6>
         </div>
         <h5>Cost: {price} &euro;</h5>
         <div className="countItems">
            <div>
               <button onClick={() => additionItem(id)}>+</button>
               <span>{count}</span>
               <button onClick={() => substractionItem(id)}>-</button>
            </div>
         </div>
         <span className="total">
            Estimation:{" "}
            {total.toLocaleString("de-DE", {
               minimumFractionDigits: 2,
               maximumFractionDigits: 2
            })}
            &euro;
         </span>
         <div className="deleteBook">
            <i style={{ marginBottom: "10px" }} className="fas fa-times-circle" onClick={() => deleteItem(id)}>
               {" "}
               <p>Delete Book</p>
            </i>
            <Link style={{ marginLeft: "20px" }} to="/list">
               Return to books
            </Link>
         </div>
      </div>
   );
};

export default AddedBooks;
