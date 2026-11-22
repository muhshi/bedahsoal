import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    Credentials({
      id: "guest-login",
      name: "Tamu BedahSoal",
      credentials: {
        name: { label: "Nama Lengkap", type: "text", placeholder: "Nama Anda" },
        email: { label: "Email", type: "email", placeholder: "email@contoh.com" },
      },
      async authorize(credentials) {
        const rawName = (credentials?.name as string)?.trim() || "Peserta Tryout";
        const email =
          (credentials?.email as string)?.trim().toLowerCase() ||
          `tamu_${Math.random().toString(36).substring(2, 9)}@bedahsoal.id`;

        const user = await db.user.upsert({
          where: { email },
          update: { name: rawName },
          create: {
            email,
            name: rawName,
            role: "USER",
          },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image || user.avatarUrl,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.id) {
          session.user.id = token.id as string;
        } else if (token.sub) {
          session.user.id = token.sub;
        }
        (session.user as any).role = token.role || "USER";
      }
      return session;
    },
  },
});
