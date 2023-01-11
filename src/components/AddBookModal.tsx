import { Modal } from "@mantine/core";
import type { FC } from "react";

interface Props {
    opened: boolean;
    closeModal: () => void;
}

const AddBookModal: FC<Props> = ({ opened, closeModal }) => {
    return (
        <Modal
            opened={opened}
            title="Add Book!"
            onClose={closeModal}
            centered
        ></Modal>
    );
};

export default AddBookModal;
