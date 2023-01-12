import Header from "@/components/Home/Header";
import { Box, Flex, Image, Title } from "@mantine/core";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Resonotes</title>
                <meta name="description" content="Resonotes Book Highlights App" />
            </Head>
            <main>
                <Box bg="yellow" mih="100vh">
                    <Header links={[{ link: '/dashboard', label: 'Go To Dashboard' }]} />
                    <Flex align="center" justify="center" direction="column" gap="lg" mt="-30px">
                        <Title order={2}>Resonotes Book Highlights Taking App</Title>
                        <Box w="90%" maw="1200px">
                            <Image src="/images/hero.png" alt="Hero Image" radius="sm" />
                        </Box>
                    </Flex>
                </Box>
            </main>
        </>
    );
};

export default Home;
