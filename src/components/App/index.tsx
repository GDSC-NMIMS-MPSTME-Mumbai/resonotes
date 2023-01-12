import { api } from "@/utils/api";
import { Alert, Flex, ScrollArea, Text, Title } from "@mantine/core";
import type { FC } from "react";
import NoteEditor from "./NoteEditor";
import { IconAlertCircle, IconBook } from "@tabler/icons";

type props = {
    activeBook: string;
    setActiveBook: (book: string) => void;
};

const App: FC<props> = ({ activeBook }) => {
    const { data: books } = api.books.getAll.useQuery(undefined, {
        refetchOnWindowFocus: false,
    });
    const { data: book } = api.books.get.useQuery(
        { book: activeBook },
        { refetchOnWindowFocus: false }
    );

    if (books === undefined) return null;

    if (!activeBook) {
        return (
            <Flex align="center" justify="center" h="100vh" sx={{ flex: 1 }}>
                {books.length === 0 ? (
                    <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="Note: No book has been added"
                        color="yellow"
                    >
                        Start by adding a book.
                    </Alert>
                ) : (
                    <Alert icon={<IconBook />} color="yellow">
                        Please select a book.
                    </Alert>
                )}
            </Flex>
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
