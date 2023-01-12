import { api } from "@/utils/api";
import { closeAllModals } from "@mantine/modals";
import { type FC, useEffect, useState } from "react";
import BookList from "./BookList";
import Search from "./Search";
import { getAuthorData, titleCase } from '../../utils/helpers'

type props = {
    activeBook: string;
    setActiveBook: (book: string) => void;
    refetch: () => void;
};

const AddBook: FC<props> = ({ setActiveBook, refetch, activeBook }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const mutation = api.books.add.useMutation({onSuccess: (data) => {
        refetch();
        setActiveBook(data.book);
    }});

    useEffect(() => {
        if (!searchQuery) {
            return setSearchResults([]);
        }
        const delayDebounceFn = setTimeout(() => {
            fetch(
                "https://www.googleapis.com/books/v1/volumes?maxResults=3&q=" +
                    titleCase(searchQuery)
            )
                .then((res) => res.json())
                .then((data) => {
                    const processed = data.items.map((item: any) => {
                        return {
                            title: item.volumeInfo.title,
                            author: getAuthorData(item.volumeInfo.authors),
                            thumbnail: item.volumeInfo.imageLinks?.thumbnail,
                            id: item.id,
                        };
                    });
                    setSearchResults(processed);
                });
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    async function handleSumit(id: string) {
        mutation.mutate({ book: id });
        closeAllModals();
    }

    return (
        <div>
            <Search
                onChange={(event) => {
                    setSearchQuery(event.target.value);
                }}
            />
            <BookList books={searchResults} onClick={handleSumit} activeBook={activeBook} searchResult={true} />
        </div>
    );
};

export default AddBook;
