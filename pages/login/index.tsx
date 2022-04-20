import { BuiltInProviderType } from "next-auth/providers";
import {
    ClientSafeProvider,
    getProviders,
    LiteralUnion,
    signIn,
} from "next-auth/react";
import Image from "next/image";

type Props = {
    providers: Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
    >;
};

const LoginPage = ({ providers }: Props) => {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <div className="w-52 h-52 mb-12 relative">
                <Image src="/logo.png" alt="Spotify Logo" layout="fill" />
            </div>

            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        className="bg-[#18D860] text-black font-semibold p-5 rounded-full"
                        onClick={() =>
                            signIn(provider.id, { callbackUrl: "/" })
                        }
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default LoginPage;

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers,
        },
    };
}
