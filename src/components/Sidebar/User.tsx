import {
    Box,
    Group,
    Avatar,
    useMantineTheme,
    Text,
    Button,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type { FC } from "react";

const User: FC = () => {
    const theme = useMantineTheme();

    const { data: session } = useSession();

    return (
        <Box
            sx={{
                paddingTop: theme.spacing.sm,
                borderTop: `1px solid ${
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[4]
                        : theme.colors.gray[2]
                }`,
            }}
        >
            <Box
                pos="relative"
                sx={{
                    display: "block",
                    width: "100%",
                    padding: theme.spacing.xs,
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
                }}
            >
                <Group>
                    <Avatar
                        src={session?.user?.image}
                        radius="xl"
                    />
                    <Box sx={{ flex: 1 }} w={10}>
                        <Text size="sm" weight={500} truncate>
                            {session?.user?.name}
                        </Text>
                        <Text color="dimmed" size="xs" truncate>
                            {session?.user?.email}
                        </Text>
                    </Box>

                    <Link href="/logout">
                        <Button color="gray">Log Out</Button>
                    </Link>
                </Group>
            </Box>
        </Box>
    );
};

export default User;
