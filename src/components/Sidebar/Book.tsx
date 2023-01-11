import { UnstyledButton, Text, Flex, Image } from '@mantine/core';
import type { FC } from 'react';

export interface BookType {
  title: string;
  author: string;
  thumbnail: string;
}

const Book: FC<BookType> = ({ title, author, thumbnail }) => {
  return (
    <UnstyledButton
      sx={theme => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Flex gap="sm">
        <Image width={95} src={thumbnail} alt={`${title}'s Thumbnail`} />
        <Flex direction="column" justify="center">
          <Text fz="lg" fw={700}>
            {title}
          </Text>
          <Text>{author}</Text>
        </Flex>
      </Flex>
    </UnstyledButton>
  );
};

export default Book;
