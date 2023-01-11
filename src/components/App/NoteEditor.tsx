import { FC, useState } from 'react';
import RichTextEditor from './RTE';

const NoteEditor: FC = () => {
  const [note, setNote] = useState<string>('');

  return (
    <RichTextEditor
      value={note}
      onChange={setNote}
      sx={{ fontFamily: 'Lora, ui-serif, Times, serif' }}
      placeholder="What resonated with you as you were reading this book?"
    />
  );
};

export default NoteEditor;
