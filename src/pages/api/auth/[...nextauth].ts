import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

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
			clientId:
				"992633208513-jusn57h876taso6q1o2tv0ntnbk4g0q5.apps.googleusercontent.com",
			clientSecret: "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",
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
};

export default NextAuth(authOptions);
