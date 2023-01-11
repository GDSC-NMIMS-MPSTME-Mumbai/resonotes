import type { FC } from 'react';
import Book, { BookType } from './Book';

interface Props {
  books: BookType[];
}

const BookList: FC<Props> = ({ books }) => {
  return (
    <div>
      {books.map((book, id) => (
        <Book key={id} {...book} />
      ))}
    </div>
  );
};

export default BookList;
