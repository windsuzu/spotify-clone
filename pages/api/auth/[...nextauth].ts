import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

interface SpotifyJWT extends JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    userId: string;
}

const refreshAccessToken = async (token: SpotifyJWT) => {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        return {
            ...token,
            accessToken: refreshedToken.access_token,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
        };
    } catch (error) {
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
};

export default NextAuth({
    // API Routes: configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
            authorization: LOGIN_URL,
        }),
        // you can add more providers here...
    ],
    // JWT secrets
    secret: process.env.JWT_SECRET!,

    // Custom Login Pages
    pages: {
        signIn: "/login",
    },

    callbacks: {
        async jwt({ token, account, user }) {
            // initial sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    userId: account.providerAccountId,
                    accessTokenExpires: account.expires_at! * 1000,
                };
            }

            // accessToken still valid
            if (Date.now() < (token as SpotifyJWT).accessTokenExpires * 1000) {
                return token;
            }

            // accessToken expired, refresh it
            return await refreshAccessToken(token as SpotifyJWT);
        },

        async session({ session, token }) {
            session.accessToken = (token as SpotifyJWT).accessToken;
            session.refreshToken = (token as SpotifyJWT).refreshToken;
            session.userId = (token as SpotifyJWT).userId;

            return session;
        },
    },
});
