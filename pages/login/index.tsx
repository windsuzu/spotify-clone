import { BuiltInProviderType } from "next-auth/providers";
import type { GetServerSideProps } from "next";
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
        <div className="flex flex-col items-center bg-dec bg-no-repeat min-h-screen w-full justify-center bg-[#2d46b9] text-center bg-[top_5rem_left_-30rem] lg:bg-[top_5rem_left_-15rem]">
            <div className="mb-12 flex flex-col space-y-6 items-center">
                <h1 className="text-white font-bold text-5xl md:text-8xl">
                    Music For Everyone
                </h1>
                <h2 className="text-white font-medium text-base md:text-2xl">
                    Millions of songs. No credit card needed.
                </h2>
            </div>

            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        className="text-[#2d46b9] bg-[#18D860] p-4 px-8 rounded-full hover:scale-125 transition duration-150 ease-out"
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

export const getServerSideProps: GetServerSideProps = async () => {
    const providers = await getProviders();
    return {
        props: {
            providers,
        },
    };
};
