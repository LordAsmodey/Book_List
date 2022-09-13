import React, { useEffect, useState } from 'react';
import { getBooks } from '../../api/api';
import { Book } from '../../api/Types/Book';
import { EditBookForm } from '../EditBookForm/EditBookForm';
import { Loader } from '../Loader/Loader';

export const Dashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [editedBook, setEditedBook] = useState<Book | null>(null);

  useEffect(() => {
    setLoading(true);
    getBooks()
      .then(res => setBooks(res))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {loading && <Loader />}
      {!loading && (
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Book title</th>
              <th>Author name</th>
              <th>Category</th>
              <th><abbr title="International Standard Book Number">ISBN</abbr></th>
              <th>Actions</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Book title</th>
              <th>Author name</th>
              <th>Category</th>
              <th><abbr title="International Standard Book Number">ISBN</abbr></th>
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
                    className="button mr-1"
                    onClick={() => setEditedBook(book)}
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    className="button"
                    onClick={() => {}}
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
