import type { FC } from 'react';
import Book, { type BookType } from './Book';

interface Props {
  books: BookType[];
  activeBook: string;
  onClick: (event: any) => void;
  searchResult?: boolean;
  refresh: () => void;
}

const BookList: FC<Props> = ({ books, onClick, activeBook, searchResult = false, refresh }) => {
  return (
    <div>
      {books.map((book, id) => (
        <Book key={id} {...book} onClick={onClick} activeBook={activeBook} searchResult={searchResult} refresh={refresh} />
      ))}
    </div>
  );
};

export default BookList;
