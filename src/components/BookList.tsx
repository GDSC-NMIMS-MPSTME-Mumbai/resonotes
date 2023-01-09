import type { FC } from "react";
import Book from "./Book";

interface Book {
    title: string;
    author: string;
    thumbnail: string;
}

interface Props {
    books: Book[];
    filter: string;
}

const BookList: FC<Props> = ({ books, filter }) => {
    return (
        <ul className="scrollbar-rounded-sm max-h-full flex-1 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black scrollbar-thumb-rounded-md">
            {books
                .filter((book) => book.title.toLowerCase().includes(filter))
                .map((book, id) => (
                    <li key={id}>
                        <Book
                            title={book.title}
                            author={book.author}
                            thumbnail={book.thumbnail}
                        />
                    </li>
                ))}
        </ul>
    );
};

export default BookList;
