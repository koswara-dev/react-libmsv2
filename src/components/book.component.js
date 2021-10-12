import React, { Component } from "react";
import BookDataService from "../services/book.service";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.onChangeISBN = this.onChangeISBN.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePublicationYear = this.onChangePublicationYear.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.getBook = this.getBook.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);

    this.state = {
      currentBook: {
        id: null,
        isbn: "",
        title: "",
        publicationYear: "",
        language: "", 
        author: "", 
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getBook(this.props.match.params.id);
  }

  onChangeISBN(e) {
    const isbn = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBook: {
          ...prevState.currentBook,
          isbn: isbn
        }
      };
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBook: {
          ...prevState.currentBook,
          title: title
        }
      };
    });
  }

  onChangePublicationYear(e) {
    const publicationYear = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBook: {
          ...prevState.currentBook,
          publicationYear: publicationYear
        }
      };
    });
  }

  onChangeLanguage(e) {
    const language = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBook: {
          ...prevState.currentBook,
          language: language
        }
      };
    });
  }

  onChangeAuthor(e) {
    const author = e.target.value;
    
    this.setState(prevState => ({
      currentBook: {
        ...prevState.currentBook,
        author: author
      }
    }));
  }

  getBook(id) {
    BookDataService.get(id)
      .then(response => {
        this.setState({
          currentBook: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentBook.id,
      isbn: this.state.currentBook.isbn,
      title: this.state.currentBook.title,
      publicationYear: this.state.currentBook.publicationYear,
      language: this.state.currentBook.language,
      author: this.state.currentBook.author,
      published: status
    };

    BookDataService.update(this.state.currentBook.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentBook: {
            ...prevState.currentBook,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateBook() {
    BookDataService.update(
      this.state.currentBook.id,
      this.state.currentBook
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The book was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteBook() {    
    BookDataService.delete(this.state.currentBook.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/books')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentBook } = this.state;

    return (
      <div>
        {currentBook ? (
          <div className="edit-form">
            <h4>Book</h4>
            <form>
              <div className="form-group">
                <label htmlFor="isbn">ISBN</label>
                <input
                  type="text"
                  className="form-control"
                  id="isbn"
                  value={currentBook.isbn}
                  onChange={this.onChangeISBN}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBook.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="publicationYear">Publication Year</label>
                <input
                  type="text"
                  className="form-control"
                  id="publicationYear"
                  value={currentBook.publicationYear}
                  onChange={this.onChangePublicationYear}
                />
              </div>
              <div className="form-group">
                <label htmlFor="language">Language</label>
                <input
                  type="text"
                  className="form-control"
                  id="language"
                  value={currentBook.language}
                  onChange={this.onChangeLanguage}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={currentBook.author}
                  onChange={this.onChangeAuthor}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentBook.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentBook.published ? (
              <button
                className="badge bg-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge bg-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge bg-danger mr-2"
              onClick={this.deleteBook}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge bg-success"
              onClick={this.updateBook}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Book...</p>
          </div>
        )}
      </div>
    );
  }
}