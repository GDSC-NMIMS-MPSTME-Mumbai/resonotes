import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Resonotes</title>
                {/* TODO Add a better description */}
                <meta name="description" content="Resonotes Home Page" />{" "}
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                    Resonotes Home Page
                </h1>
            </main>
        </>
    );
};

export default Home;
