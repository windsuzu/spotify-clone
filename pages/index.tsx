import { useSession } from "next-auth/react";
import Head from "next/head";
import Sidebar from "../components/sidebar";

const Home = () => {
    const { data: session, status } = useSession();
    console.log(session);

    return (
        <div className="bg-black h-screen overflow-hidden">
            <Head>
                <title>Spotify Clone</title>
                <meta name="description" content="A spotify clone project." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Sidebar />
                {/* center */}
            </main>

            <div>{/* player */}</div>
        </div>
    );
};

export default Home;
