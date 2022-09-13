export type Book =
  {
    'id': number,
    'title': string,
    'authorName': string,
    'category': string,
    'ISBN': string
  };

export type addedBook = Omit<Book, 'id'>;
