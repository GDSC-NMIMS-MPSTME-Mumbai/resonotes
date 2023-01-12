import {
    TextInput,
    type TextInputProps
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";

export default function Search(props: TextInputProps) {
    return (
        <TextInput
            icon={<IconSearch size={18} stroke={1.5} />}
            radius="xl"
            size="md"
            placeholder="Search Books"
            rightSectionWidth={42}
            {...props}
        />
    );
}
