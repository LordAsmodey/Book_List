import React, { useState } from 'react';
import { InputField } from '../InputField/InputField';
import { addBook } from '../../api/api';
import { addedBook } from '../../api/Types/Book';

export const AddBookForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('Politics');
  const [ISBN, setISBN] = useState('');

  const isHasEmptyFields = title.length === 0 && authorName.length === 0 && ISBN.length === 0;

  const addBookHandler = () => {
    const newBook: addedBook = {
      title,
      authorName,
      category,
      ISBN,
    };

    if (!isHasEmptyFields) {
      addBook(newBook).finally();
    }
  };

  return (
    <>
      <form onSubmit={(event) => {
        event.preventDefault();
      }}
      >
        <InputField
          name="Book title"
          value={title}
          label="Book title"
          required
          onChange={setTitle}
        />
        <InputField
          name="Author name"
          value={authorName}
          label="Author name"
          required
          onChange={setAuthorName}
        />
        <div className="field">
          <label htmlFor="category" className="label">
            Select category
            <div className="control">
              <div className="select">
                <select
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
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

        <InputField
          name="Enter ISBN"
          value={ISBN}
          label="ISBN"
          required
          onChange={setISBN}
        />
      </form>
      <div className="field is-grouped is-grouped-centered mt-3">
        <p className="control">
          <button
            type="button"
            className="button is-primary"
            disabled={isHasEmptyFields}
            onClick={addBookHandler}
          >
            Submit
          </button>
        </p>
        <p className="control">
          <button type="button" className="button is-light">
            Cancel
          </button>
        </p>
      </div>
    </>
  );
};
