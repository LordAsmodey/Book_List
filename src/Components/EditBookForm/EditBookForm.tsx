import React from 'react';
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setBooks,
    editedBook: book,
    setEditedBook,
  } = props;

  const formSubmitHandler = () => {
    if (book) {
      // eslint-disable-next-line no-console
      editBook(book).then((res) => {
        setBooks((prev: Book[]) => (
          [...prev.filter(item => item.id !== res.id),
            res,
          ]
        ));
      })
        .finally(() => {
          setEditedBook(null);
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
          <form onSubmit={(event) => {
            event.preventDefault();
            formSubmitHandler();
          }}
          >
            <label htmlFor="book-title">
              Enter book title:
              <input
                id="book-title"
                type="text"
                className="input"
                placeholder="Enter book title"
                value={book?.title}
                onChange={(event) => {
                  setEditedBook((prev: Book) => ({
                    ...prev,
                    title: event.target.value,
                  }));
                }}
                required
              />
            </label>
            <label htmlFor="author-name">
              Enter author name:
              <input
                id="author-name"
                type="text"
                className="input"
                placeholder="Enter author name"
                value={book?.authorName}
                onChange={(event) => {
                  setEditedBook((prev: Book) => ({
                    ...prev,
                    authorName: event.target.value,
                  }));
                }}
                required
              />
            </label>
            <label htmlFor="category">
              Enter category:
              <input
                id="category"
                type="text"
                className="input"
                placeholder="Enter category"
                value={book?.category}
                onChange={(event) => {
                  setEditedBook((prev: Book) => ({
                    ...prev,
                    category: event.target.value,
                  }));
                }}
                required
              />
            </label>
            <label htmlFor="ISBN">
              Enter ISBN:
              <input
                id="ISBN"
                type="text"
                className="input"
                placeholder="Enter ISBN"
                value={book?.ISBN}
                onChange={(event) => {
                  setEditedBook((prev: Book) => ({
                    ...prev,
                    ISBN: event.target.value,
                  }));
                }}
                required
              />
            </label>
          </form>
        </section>
        <footer className="modal-card-foot">
          <button
            type="button"
            className="button is-success"
            onClick={formSubmitHandler}
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
