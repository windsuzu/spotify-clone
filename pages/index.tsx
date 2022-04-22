import Head from "next/head";
import Center from "../components/center";
import Sidebar from "../components/sidebar";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const Home = () => {
    return (
        <div className="bg-black h-screen overflow-hidden">
            <Head>
                <title>Spotify Clone</title>
                <meta name="description" content="A spotify clone project." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex">
                <Sidebar />
                <Center />
            </main>

            <div>{/* player */}</div>
        </div>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    return {
        props: { session },
    };
};
