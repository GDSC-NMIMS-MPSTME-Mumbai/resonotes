import type { FC } from "react";
import BookList from "./BookList";
import SearchBar from "./SearchBar";
import { useState } from "react";
import User from "./User";

const SideBar: FC = () => {
    const books = [
        {
            title: "Atomic Habits",
            author: "James Clear",
            thumbnail:
                "https://books.google.com/books/publisher/content?id=XfFvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70E_9SpZ8SLIKPFV7Pnlrq8PE5pALKOajgfqnYDZm0WqkDMLZj0VU8pnl0efpKbOqByMntEXR81q_3q9pRgdsADh93GFxx-SIf1NA4yiKN3ThGnR8JrZMTkuWKQWDEkiG9dJRLW&source=gbs_api",
        },
        {
            title: "Harry Potter and the Deathly Hallows",
            author: "JK Rowling",
            thumbnail:
                "https://books.google.com/books/content?id=GZAoAQAAIAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72odwOgFN-SwysyouRMA-MZGMX1f5096QnzEvFxsNRnrcR9gJGYsoI48Oq3OSBarbpHJDH7bju_ePeuso7AOfQiWYIJBzAnP_NjB7FdExHRbXh4LmWac9Toi8wHlmPhn9k4tgZr&source=gbs_api",
        },
        {
            title: "The Psychology of Money",
            author: "Morgan Housel",
            thumbnail:
                "https://books.google.com/books/publisher/content?id=TnrrDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71s9YAlsPcOwKjoLlFuFUU-MzYMHdAdqAZovaoJOcpjTh8rB1-C0LoWEpJBCvKIvaos0aRDYp0xxeEe9_CtoOHTSP7BlFM8Wwyhz_h8wi4HyPWHqJLBMFK_9BPQbMwpcAOaCk_5&source=gbs_api",
        },
        {
            title: "Sapiens",
            author: "Yuval Noah Harari",
            thumbnail:
                "https://books.google.com/books/publisher/content?id=1EiJAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73MkCGb6nURJdJbFqxYtyUM3jTf6hrHqJuOT0rXHmHnbBkEQzObmL48ykXau-lU8kiNjJfb2awcFxR_9RFEOvCOmHAaZREHAcfn3f-pbQ9Y8Ibhk_KxADKal7pc5PHQ8O-vJTap&source=gbs_api",
        },
        {
            title: "Diary of a Wimpy Kid: The Long Haul",
            author: "Jeff Kinney",
            thumbnail:
                "https://books.google.com/books/content?id=Bu6XtAEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE713dd-8I-8YPc9kNDjSX2a1UfHNmvkQMOFnT9sOdM9J_-IWqC4OTmV2M1bkwH6bRowxwTSobW51C3s-gALov7ls4tRZ5xgo_rxyd1ZcI-NhyAuXsi8_N1UcmX8Pyk_-gaSn7wsw&source=gbs_api",
        },
    ];

    const [query, setQuery] = useState<string>("");

    return (
        <div className="fixed top-0 left-0 flex h-screen w-[450px] flex-col items-center bg-gray-200">
            <div className="w-full px-9">
                <SearchBar query={query} setQuery={setQuery} />
            </div>
            <BookList books={books} filter={query.toLowerCase()} />
            <hr className="mt-4 w-11/12 border-t border-gray-300" />
            <User />
        </div>
    );
};

export default SideBar;
