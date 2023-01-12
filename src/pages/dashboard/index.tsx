import Sidebar from "@/components/Sidebar";
import App from "@/components/App";
import { Flex } from "@mantine/core";
import Head from "next/head";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import { getServerAuthSession } from "../../server/auth";
import { useRouter } from "next/router";
import { useState } from "react";

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    return {
        props: {
            session: await getServerAuthSession(context),
        },
    };
};

const Dashboard: NextPage = () => {
    const { status } = useSession();

    const router = useRouter();

    if (status === "unauthenticated") {
        router.push('/login');
    }

    const [activeBook, setActiveBook] = useState("");

    return (
        <>
            <Head>
                <title>Dashboard | Resonotes</title>
                <meta
                    name="description"
                    content="Resonotes book highlights app."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Flex>
                    <Sidebar activeBook={activeBook} setActiveBook={setActiveBook} />
                    <App activeBook={activeBook} setActiveBook={setActiveBook} />
                </Flex>
            </main>
        </>
    );
};

export default Dashboard;
