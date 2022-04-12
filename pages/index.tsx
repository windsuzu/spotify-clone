import Head from "next/head";
import Sidebar from "../components/sidebar";

const Home = () => {
    return (
        <div className="bg-black flex h-screen overflow-hidden">
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
