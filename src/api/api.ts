import { Book } from './Types/Book';

const BASE_URL = 'http://localhost:3000';

const ENDPOINT = '/books';

export function getBooks(): Promise<Book[]> {
  return fetch(`${BASE_URL}${ENDPOINT}`)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}
