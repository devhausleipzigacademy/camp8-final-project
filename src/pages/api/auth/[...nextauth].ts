import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		// ...add more providers here
	],
};

export default NextAuth(authOptions);
