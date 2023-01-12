import type { FC } from 'react';
import Book, { BookType } from './Book';

interface Props {
  books: BookType[];
  onClick: (event: any) => void;
}

const BookList: FC<Props> = ({ books, onClick }) => {
  return (
    <div>
      {books.map((book, id) => (
        <Book key={id} {...book} onClick={onClick} />
      ))}
    </div>
  );
};

export default BookList;
