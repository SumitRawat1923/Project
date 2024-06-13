import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {      
        let user: any = null;
        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        )
          user = { id: 1, name: "Admin", email: process.env.ADMIN_EMAIL };

        if (!user) {
          throw new Error("invalid-credentials");
        }
        return user;
      },
    }),
  ],
});
