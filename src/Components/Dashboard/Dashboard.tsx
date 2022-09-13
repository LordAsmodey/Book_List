import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { deleteBook, getBooks } from '../../api/api';
import { Book } from '../../api/Types/Book';
import { EditBookForm } from '../EditBookForm/EditBookForm';
import { Loader } from '../Loader/Loader';

export const Dashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [editedBook, setEditedBook] = useState<Book | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getBooks()
      .then(res => {
        setBooks(res);
        setIsError(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const deleteBookHandler = (id: number) => {
    setIsDeleteLoading(true);
    deleteBook(id)
      .then(() => {
        setIsError(false);
        setBooks((prevState) => (
          [
            ...prevState.filter(book => book.id !== id),
          ]
        ));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsDeleteLoading(false));
  };

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && isError && (
        <p className="help is-danger">Something went wrong.</p>
      )}
      {!isLoading && books.length === 0 && !isError && (
        <p
          className="help is-info"
        >
          The list of books is empty! Add something to the list of books.
        </p>
      )}
      {!isLoading && books.length > 0 && (
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Book title</th>
              <th>Author name</th>
              <th>Category</th>
              <th>
                <abbr title="International Standard Book Number">ISBN</abbr>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Book title</th>
              <th>Author name</th>
              <th>Category</th>
              <th>
                <abbr title="International Standard Book Number">ISBN</abbr>
              </th>
              <th>Actions</th>
            </tr>
          </tfoot>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>
                  {book.authorName}
                </td>
                <td>{book.category}</td>
                <td>{book.ISBN}</td>
                <td>
                  <button
                    className="button mr-1 is-info is-light"
                    onClick={() => setEditedBook(book)}
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    className={cn('button is-danger is-light',
                      { 'is-loading': isDeleteLoading })}
                    onClick={() => {
                      deleteBookHandler(book.id);
                    }}
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <EditBookForm
        setBooks={setBooks}
        editedBook={editedBook}
        setEditedBook={setEditedBook}
      />
    </div>
  );
};
