import React, { Component } from "react";
import { Link } from "react-router-dom";

class Book extends Component {
   state = {};

   render() {
      const { author, title, cover, isActive, price, id } = this.props.elem;

      return (
         <div className="book-Cart">
            <h2>{author}</h2>
            <h3>{title}</h3>
            <div className="img-book">
               {isActive ? <span>Book added</span> : null}
               <Link to={`/viewBook/${id}`}>
                  <img src={cover} alt="Book cover" />
               </Link>
            </div>
            <div className="addBasket">
               <Link to={`/viewBook/${id}`}>
                  <button className="main-btn">
                     <i className="fas fa-glasses" /> Read details
                  </button>
               </Link>

               <h4>Only {price} &euro;</h4>
            </div>
         </div>
      );
   }
}
export default Book;