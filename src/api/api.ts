import { Book } from './Types/Book';

const BASE_URL = 'http://localhost:3000/books';

export function getBooks(): Promise<Book[]> {
  return fetch(`${BASE_URL}`)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}

export function editBook(book: Book): Promise<Book> {
  return fetch(`${BASE_URL}/${book.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(book),
  })
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}
