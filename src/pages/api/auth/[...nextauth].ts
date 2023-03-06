import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();
const clientId = process.env.GOOGLE_CLIENT_ID ?? "";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? "";

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers

	adapter: PrismaAdapter(prisma),
	providers: [
		//would like to start with Email provider
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
		GoogleProvider({
			clientId: clientId,
			clientSecret: clientSecret,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
		// ...add more providers here
	],
	session: {
		strategy: "jwt",
	},
	secret: process.env.SECRET,
	jwt: {
		secret: process.env.SECRET,
	},

	pages: {
		signIn: "/auth/signIn",
		signOut: "/auth/signout",
		error: "/auth/error", // Error code passed in query string as ?error=
		verifyRequest: "/auth/verify-request", // (used for check email message)
		newUser: "src/pages/launch/index.tsx", // New users will be directed here on first sign in (leave the property out if not of interest)
	},

	callbacks: {
		async jwt({ token }) {
			token.userRole = "user";
			return token;
		},
	},
};

export default NextAuth(authOptions);
