import React, { Component } from "react";
import BookDataService from "../services/book.service";

export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.onChangeISBN = this.onChangeISBN.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePublicationYear = this.onChangePublicationYear.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.newBook = this.newBook.bind(this);

    this.state = {
      id: null,
      isbn: "",
      title: "",
      publicationYear: "",
      language: "", 
      author: "", 
      published: false,

      submitted: false
    };
  }

  onChangeISBN(e) {
    this.setState({
      isbn: e.target.value
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangePublicationYear(e) {
    this.setState({
      publicationYear: e.target.value
    });
  }

  onChangeLanguage(e) {
    this.setState({
      language: e.target.value
    });
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    });
  }

  saveBook() {
    var data = {
      isbn: this.state.isbn,
      title: this.state.title,
      publicationYear: this.state.publicationYear,
      language: this.state.language,
      author: this.state.author
    };

    BookDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          isbn: response.data.isbn,
          title: response.data.title,
          publicationYear: response.data.publicationYear,
          language: response.data.language,
          author: response.data.author,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newBook() {
    this.setState({
      id: null,
      isbn: "",
      title: "",
      publicationYear: "",
      language: "",
      author: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newBook}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-3">
              <label htmlFor="isbn" className="form-label">ISBN</label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                required
                value={this.state.isbn}
                onChange={this.onChangeISBN}
                name="isbn"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="publicationYear" className="form-label">Publication Year</label>
              <input
                type="text"
                className="form-control"
                id="publicationYear"
                required
                value={this.state.publicationYear}
                onChange={this.onChangePublicationYear}
                name="publicationYear"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="language" className="form-label">Language</label>
              <input
                type="text"
                className="form-control"
                id="language"
                required
                value={this.state.language}
                onChange={this.onChangeLanguage}
                name="language"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="author" className="form-label">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                required
                value={this.state.author}
                onChange={this.onChangeAuthor}
                name="author"
              />
            </div>

            <button onClick={this.saveBook} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}