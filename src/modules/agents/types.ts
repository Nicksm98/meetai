import { inferRouterOutputs } from "@/modules/agents/server/procedures";

import { AppRouter } from "@/trpc/routers/_app";

export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"];