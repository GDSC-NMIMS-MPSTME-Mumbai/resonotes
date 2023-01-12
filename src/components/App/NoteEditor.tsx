import { api } from "@/utils/api";
import { type FC, useState, useEffect } from "react";
import RichTextEditor from "./RTE";

interface props {
    bookId: string;
}

const NoteEditor: FC<props> = ({ bookId }) => {
    const [note, setNote] = useState<string>("");
    const mutation = api.highlights.set.useMutation();

    api.highlights.get.useQuery({ book: bookId }, { refetchOnWindowFocus: false, onSuccess: (data) => {
      setNote(data)
    }})

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          if (note != "")
            mutation.mutate({ highlight: note, book: bookId });
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [note]);

    return (
        <RichTextEditor
            value={note}
            onChange={setNote}
            sx={{ fontFamily: "Lora, ui-serif, Times, serif" }}
            placeholder="What resonated with you as you were reading this book?"
        />
    );
};

export default NoteEditor;
