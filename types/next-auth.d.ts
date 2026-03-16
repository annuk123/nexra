// types/next-auth.d.ts
import "next-auth";
declare module "next-auth" {
  interface Session {
    apiToken: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}