import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { polar, checkout, portal } from "@polar-sh/better-auth";

import { db } from "@/db"; 
import * as schema from "@/db/schema";

import { polarClient } from "./polar";

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const socialProviders = {
    ...(githubClientId && githubClientSecret
        ? {
              github: {
                  clientId: githubClientId,
                  clientSecret: githubClientSecret,
              },
          }
        : {}),
    ...(googleClientId && googleClientSecret
        ? {
              google: {
                  clientId: googleClientId,
                  clientSecret: googleClientSecret,
              },
          }
        : {}),
};

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    authenticatedUsersOnly: true,
                    successUrl: "/upgrade",
                }),
                portal(),
            ],
        }),
    ],
    ...(Object.keys(socialProviders).length > 0 ? { socialProviders } : {}),
    emailAndPassword: {
        enabled: true,
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema:{
            ...schema,
        }
    })
});