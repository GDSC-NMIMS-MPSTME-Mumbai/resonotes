import { api } from "@/utils/api";
import { ScrollArea, Text, Title } from "@mantine/core";
import type { FC } from "react";
import NoteEditor from "./NoteEditor";

type props = {
    activeBook: string;
    setActiveBook: (book: string) => void;
};

const App: FC<props> = ({ activeBook }) => {

    const { data: books } = api.books.getAll.useQuery(undefined, { refetchOnWindowFocus: false })
    const { data: book } = api.books.get.useQuery({ book: activeBook }, { refetchOnWindowFocus: false })

    if (books === undefined) return null

    if (!activeBook) {
        if (books.length === 0) return (
            <div style={{ display: 'grid', placeItems: "center" }}>
              <h3 style={{ margin: "auto" }}>Please Add a Book</h3>
            </div>
        );
        return (
            <div style={{ display: 'grid', placeItems: "center" }}>
              <h3 style={{ margin: "auto" }}>Please Select a Book</h3>
            </div>
        );
    }

    return (
        <ScrollArea px={50} pt={50} h="100vh" sx={{ flex: 1 }}>
            <Title order={1} mb="sm">
                {book?.title}
            </Title>
            <Text
                mb="lg"
                fz="lg"
                sx={{ fontFamily: "Lora, ui-serif, Times, serif" }}
            >
                {book?.author}
            </Text>
            <NoteEditor bookId={activeBook} />
        </ScrollArea>
    );
};

export default App;
