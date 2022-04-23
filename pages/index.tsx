import Head from "next/head";
import Center from "../components/center";
import Sidebar from "../components/sidebar";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Player from "../components/player";

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

            <div className="sticky flex items-center bottom-0 h-24 text-white bg-gradient-to-b from-black to-gray-900">
                <Player />
            </div>
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
