import type { GetServerSidePropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { getServerAuthSession } from "../../server/auth";
import SideBar from "@/components/SideBar";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    return {
        props: {
            session: await getServerAuthSession(context),
        },
    };
}

const Dashboard: NextPage = () => {
    // const { data: session, status } = useSession();

    // if (status === "loading") {
    //     return <p>Loading...</p>;
    // }

    // if (status === "unauthenticated") {
    //     return <p>Access Denied</p>;
    // }

    return (
        <>
            <Head>
                <title>Resonotes Dashboard</title>
                {/* TODO Add a better description */}
                <meta
                    name="description"
                    content="Create, Edit and View book highlights"
                />{" "}
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <SideBar />
            </main>
        </>
    );
};

export default Dashboard;
