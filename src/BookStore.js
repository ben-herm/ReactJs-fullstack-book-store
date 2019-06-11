import "./styles/main.scss";
import "./index.scss";
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import BookList from "./Components/BookList";
import ViewBook from "./Components/ViewBook";
import YourCart from "./Components/BookCart";
import PageNotFound from "./Components/NotFound";
import End from "./Components/end";

class BookStore extends Component {
   state = {};

   render() {
      const {} = this.state;

      return (
         <>
            <Navigation />
            <div className="wrapper">
               <Switch>
                  <Route path="/" exact component={BookList} />
                  <Route path="/viewBook/:id" component={ViewBook} />
                  <Route path="/end" component={End} />
                  <Route path="/yourCart" component={YourCart} />
                  <Route component={PageNotFound} />
               </Switch>
            </div>
         </>
      );
   }
}
export default BookStore;
