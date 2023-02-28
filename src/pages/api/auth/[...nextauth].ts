import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	providers: [
		//would like to start with Email provider
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
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
		signIn: "/auth/email-ssignin",
		signOut: "/auth/signout",
		error: "/auth/error", // Error code passed in query string as ?error=
		verifyRequest: "/auth/verify-request", // (used for check email message)
		newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
	},
};

export default NextAuth(authOptions);
