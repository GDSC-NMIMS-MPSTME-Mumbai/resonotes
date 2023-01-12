import { api } from "@/utils/api";
import { UnstyledButton, Text, Flex, Image, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import type { FC } from "react";

export interface BookType {
    id: string;
    title: string;
    author: string;
    thumbnail: string;
    searchResult?: boolean;
}

type Props = BookType & {
    onClick: (event: any) => void;
    activeBook: string;
    refresh: () => void;
};

const Book: FC<Props> = ({
    id,
    title,
    author,
    thumbnail,
    onClick,
    activeBook,
    searchResult = false,
    refresh
}) => {
    const mutation = api.books.delete.useMutation();

    return (
        <UnstyledButton
            display="block"
            pos="relative"
            w="100%"
            p="xs"
            sx={(theme) => {
                if (id === activeBook) {
                    return {
                        borderRadius: theme.radius.sm,
                        color:
                            theme.colorScheme === "dark"
                                ? theme.colors.dark[0]
                                : theme.black,
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? theme.colors.dark[5]
                                : theme.colors.gray[1],
                    };
                }

                return {
                    borderRadius: theme.radius.sm,
                    color:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[0]
                            : theme.black,

                    "&:hover": {
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? theme.colors.dark[6]
                                : theme.colors.gray[0],
                    },
                };
            }}
            className="book"
            onClick={() => {
                onClick(id);
            }}
        >
            <Flex gap="sm">
                <Image
                    width={95}
                    src={thumbnail}
                    alt={`${title}'s Thumbnail`}
                />
                <Flex direction="column" justify="center">
                    <Text fz="lg" fw={700}>
                        {title}
                    </Text>
                    <Text>{author || "Anonymous"}</Text>
                </Flex>
            </Flex>
            {!searchResult && (
                <ActionIcon
                    className="delete-icon"
                    pos="absolute"
                    top={5}
                    right={5}
                    color="gray"
                    variant="transparent"
                    size="md"
                    onClick={(e) => {
                        e.stopPropagation();
                        mutation.mutate({ book: id }, { onSuccess: () => {
                            refresh()
                            if (activeBook && id === activeBook) 
                                onClick("")
                        }});
                    }}
                >
                    <IconTrash size={18} />
                </ActionIcon>
            )}
        </UnstyledButton>
    );
};

export default Book;
