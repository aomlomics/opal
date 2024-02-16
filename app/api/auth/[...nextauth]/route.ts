import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const handler = NextAuth({
	session: {
		strategy: "jwt"
	},
	providers: [
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code"
				}
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				// token.roleId = user.roleId;
			}
			return token;
		},
		async session ({ session, token }) {
			if (session?.user) {
				// session.user.roleId = token.roleId;
			}
			return session;
		},
		async signIn({ account, profile }) {
			if (!profile?.email) {
				throw new Error("No profile");
			}

			//TODO: insert user into database using profile.email and profile.name

			return true;
		},
	}
});

export { handler as GET, handler as POST };