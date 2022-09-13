import { addedBook, Book } from './Types/Book';

const BASE_URL = 'http://localhost:3000/books';

export function getBooks(): Promise<Book[]> {
  return fetch(`${BASE_URL}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Something went wrong');
    });
}

export function editBook(book: Book): Promise<Book> {
  return fetch(`${BASE_URL}/${book.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(book),
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Something went wrong');
    });
}

export function addBook(book: addedBook): Promise<Book> {
  return fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(book),
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Something went wrong');
    });
}

export function deleteBook(id: number): Promise<Book> {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Something went wrong');
    });
}
