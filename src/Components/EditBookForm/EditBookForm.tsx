import React from 'react';
import cn from 'classnames';
import { Book } from '../../api/Types/Book';

type Props = {
  editedBook: Book,
};

export const EditBookForm: React.FC<Props> = (props) => {
  const { editedBook: book } = props;

  // eslint-disable-next-line no-console
  console.log(book);

  return (
    <div className={cn('modal', { 'is-active': book })}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button type="button" className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          12345
        </section>
        <footer className="modal-card-foot">
          <button type="button" className="button is-success">Save changes</button>
          <button type="button" className="button">Cancel</button>
        </footer>
      </div>
    </div>
  );
};
