import React, { Component } from "react";
import BookDataService from "../services/book.service";
import { Link } from "react-router-dom";

export default class BooksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchISBN = this.onChangeSearchISBN.bind(this);
    this.retrieveBooks = this.retrieveBooks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBook = this.setActiveBook.bind(this);
    this.removeAllBooks = this.removeAllBooks.bind(this);
    this.searchISBN = this.searchISBN.bind(this);

    this.state = {
      books: [],
      currentBook: null,
      currentIndex: -1,
      searchISBN: ""
    };
  }

  componentDidMount() {
    this.retrieveBooks();
  }

  onChangeSearchISBN(e) {
    const searchISBN = e.target.value;

    this.setState({
      searchISBN: searchISBN
    });
  }

  retrieveBooks() {
    BookDataService.getAll()
      .then(response => {
        this.setState({
          books: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBooks();
    this.setState({
      currentBook: null,
      currentIndex: -1
    });
  }

  setActiveBook(book, index) {
    this.setState({
      currentBook: book,
      currentIndex: index
    });
  }

  removeAllBooks() {
    BookDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchISBN() {
    BookDataService.findByISBN(this.state.searchISBN)
      .then(response => {
        this.setState({
          books: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchISBN, books, currentBook, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by ISBN"
              value={searchISBN}
              onChange={this.onChangeSearchISBN}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchISBN}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Books List</h4>

          <ul className="list-group">
            {books &&
              books.map((book, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBook(book, index)}
                  key={index}
                >
                  {book.isbn}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllBooks}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentBook ? (
            <div>
              <h4>Book</h4>
              <div>
                <label>
                  <strong>ISBN:</strong>
                </label>{" "}
                {currentBook.isbn}
              </div>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentBook.title}
              </div>
              <div>
                <label>
                  <strong>Publication Year:</strong>
                </label>{" "}
                {currentBook.publicationYear}
              </div>
              <div>
                <label>
                  <strong>Language:</strong>
                </label>{" "}
                {currentBook.language}
              </div>
              <div>
                <label>
                  <strong>Author:</strong>
                </label>{" "}
                {currentBook.author}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentBook.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/books/" + currentBook.id}
                className="badge bg-warning text-decoration-none"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Book...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}