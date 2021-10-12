import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Addbook from "./components/add-book.component";
import book from "./components/book.component";
import booksList from "./components/books-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container-fluid">
            <a href="/books" className="navbar-brand">
              LibMS
            </a>
            <div className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to={"/books"} className="nav-link">
                  Books List
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add Book
                </Link>
              </li>
            </div>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/books"]} component={booksList} />
            <Route exact path="/add" component={Addbook} />
            <Route path="/books/:id" component={book} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
