import { api } from "@/utils/api";
import { Button, Navbar, ScrollArea } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconPlus } from "@tabler/icons";
import { type FC } from "react";
import AddBook from "./AddBook";
import BookList from "./BookList";
import Brand from "./Brand";
import User from "./User";

type props = {
    activeBook: string;
    setActiveBook: (book: string) => void;
}

const Sidebar: FC<props> = ({ activeBook, setActiveBook }) => {

    const { data: books, refetch } = api.books.getAll.useQuery();

    if (!books) return null;

    return (
        <>
            <Navbar height="100vh" p="xs" zIndex={200} width={{ base: 350 }}>
                <Navbar.Section mt="xs">
                    <Brand />
                </Navbar.Section>

                <Navbar.Section my="sm">
                    <Button
                        size="md"
                        fullWidth
                        rightIcon={<IconPlus size={20} />}
                        onClick={() => {
                            openModal({
                                title: "Add a book!",
                                children: <AddBook setActiveBook={setActiveBook} refetch={refetch} activeBook={activeBook} />,
                                centered: true,
                            });
                        }}
                    >
                        Add Book
                    </Button>
                </Navbar.Section>

                <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                    <BookList books={books} onClick={setActiveBook} activeBook={activeBook} refresh={refetch} />
                </Navbar.Section>

                <Navbar.Section>
                    <User />
                </Navbar.Section>
            </Navbar>
        </>
    );
};

export default Sidebar;
