import { ScrollArea, Text, Title } from '@mantine/core';
import type { FC } from 'react';
import NoteEditor from './NoteEditor';

const App: FC = () => {
  return (
    <ScrollArea px={50} pt={50} h="100vh" sx={{ flex: 1 }}>
      <Title order={1} mb="sm">
        The Psychology of Money
      </Title>
      <Text mb="lg" fz="lg" sx={{ fontFamily: 'Lora, ui-serif, Times, serif' }}>
        Morgan Housel
      </Text>
      <NoteEditor />
    </ScrollArea>
  );
};

export default App;
