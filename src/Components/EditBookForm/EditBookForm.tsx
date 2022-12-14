import React, { useState } from 'react';
import cn from 'classnames';
import { Book } from '../../api/Types/Book';
import { editBook } from '../../api/api';

type Props = {
  setBooks: CallableFunction,
  editedBook: Book | null,
  setEditedBook: CallableFunction,
};

export const EditBookForm: React.FC<Props> = (props) => {
  const {
    setBooks,
    editedBook: book,
    setEditedBook,
  } = props;

  const [isHasEmptyFields, setIsHasEmptyFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const emptyFieldsHandler = (field: string) => {
    if (field.trim().length === 0) {
      setIsHasEmptyFields(true);
    } else {
      setIsHasEmptyFields(false);
    }
  };

  const formSubmitHandler = () => {
    setIsLoading(true);
    if (book && !isHasEmptyFields) {
      editBook(book)
        .then((res) => {
          setIsError(false);
          setEditedBook(null);
          setBooks((prev: Book[]) => (
            [...prev.filter(item => item.id !== res.id),
              res,
            ]
          ));
        })
        .catch(() => setIsError(true))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className={cn('modal', { 'is-active': book })}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit book form</p>
          <button
            type="button"
            className="delete"
            aria-label="close"
            onClick={() => setEditedBook(null)}
          >
          </button>
        </header>
        <section className="modal-card-body">
          {isError && (
            <p className="help is-danger">
              Something went wrong! Try again!
            </p>
          )}
          <form onSubmit={(event) => {
            event.preventDefault();
            formSubmitHandler();
          }}
          >
            <label className="label" htmlFor="book-title">
              Enter book title:
              <input
                id="book-title"
                type="text"
                className={cn('input',
                  { 'is-danger': book?.title.length === 0 })}
                placeholder="Enter book title"
                value={book?.title || ''}
                onChange={(event) => {
                  emptyFieldsHandler(event.target.value);
                  setEditedBook((prev: Book) => ({
                    ...prev,
                    title: event.target.value,
                  }));
                }}
                required
              />
              {!book?.title.length && (
                <p className="help is-danger">Please enter book title!</p>
              )}
            </label>
            <label htmlFor="author-name">
              Enter author name:
              <input
                id="author-name"
                type="text"
                className={cn('input',
                  { 'is-danger': book?.authorName.length === 0 })}
                placeholder="Enter author name"
                value={book?.authorName || ''}
                onChange={(event) => {
                  emptyFieldsHandler(event.target.value);
                  setEditedBook((prev: Book) => ({
                    ...prev,
                    authorName: event.target.value,
                  }));
                }}
                required
              />
              {!book?.authorName.length && (
                <p className="help is-danger">Please enter author name!</p>
              )}
            </label>
            <div className="field">
              <label htmlFor="category" className="label">
                Select category
                <div className="control">
                  <div className="select">
                    <select
                      id="category"
                      value={book?.category}
                      onChange={(event) => {
                        setEditedBook((prev: Book) => ({
                          ...prev,
                          category: event.target.value,
                        }));
                      }}
                    >
                      <option>Politics</option>
                      <option>Fantasy</option>
                      <option>Autobiography</option>
                      <option>Romance</option>
                    </select>
                  </div>
                </div>
              </label>
            </div>
            <label htmlFor="ISBN">
              Enter ISBN:
              <input
                id="ISBN"
                type="text"
                className={cn('input',
                  { 'is-danger': book?.ISBN.length === 0 })}
                placeholder="Enter ISBN"
                value={book?.ISBN || ''}
                onChange={(event) => {
                  emptyFieldsHandler(event.target.value);
                  setEditedBook((prev: Book) => ({
                    ...prev,
                    ISBN: event.target.value,
                  }));
                }}
                required
              />
              {!book?.ISBN.length && (
                <p className="help is-danger">Please enter book ISBN!</p>
              )}
            </label>
          </form>
        </section>
        <footer className="modal-card-foot">
          <button
            type="button"
            className={cn('button is-success', { 'is-loading': isLoading })}
            onClick={formSubmitHandler}
            disabled={isHasEmptyFields}
          >
            Save changes
          </button>
          <button
            type="button"
            className="button"
            onClick={() => setEditedBook(null)}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};
