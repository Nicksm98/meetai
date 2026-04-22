"use client"

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRightIcon,
  BotIcon,
  CalendarPlusIcon,
  CrownIcon,
  SparklesIcon,
  VideoIcon,
} from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { authClient } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { MAX_FREE_AGENTS, MAX_FREE_MEETINGS } from "@/modules/premium/constants";

const quickActions = [
  {
    title: "Create Agent",
    description: "Spin up a new AI teammate with custom behavior.",
    href: "/agents",
    icon: BotIcon,
  },
  {
    title: "Plan Meeting",
    description: "Schedule and organize your next collaborative call.",
    href: "/meetings",
    icon: CalendarPlusIcon,
  },
  {
    title: "Unlock Premium",
    description: "Get higher limits, more automation, and advanced controls.",
    href: "/upgrade",
    icon: CrownIcon,
  },
];

export const HomeView = () => {
  const trpc = useTRPC();
  const { data: session } = authClient.useSession();

  const { data: freeUsage } = useQuery(trpc.premium.getFreeUsage.queryOptions());
  const { data: currentSubscription } = useQuery(
    trpc.premium.getCurrentSubscription.queryOptions()
  );

  const agentCount = freeUsage?.agentCount ?? 0;
  const meetingCount = freeUsage?.meetingCount ?? 0;

  const agentProgress = Math.min((agentCount / MAX_FREE_AGENTS) * 100, 100);
  const meetingProgress = Math.min((meetingCount / MAX_FREE_MEETINGS) * 100, 100);

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <Card className="border-border/60 bg-linear-to-br from-card via-card to-muted/60">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="gap-1.5">
                <SparklesIcon className="size-3.5" />
                Workspace Overview
              </Badge>
              <Badge variant="outline">{currentSubscription?.name ?? "Free"} Plan</Badge>
            </div>
            <CardTitle className="text-2xl md:text-3xl">
              Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}.
            </CardTitle>
            <CardDescription className="max-w-2xl text-sm md:text-base">
              Manage AI agents, run smarter meetings, and keep momentum with one
              collaborative workflow.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/meetings">
                <VideoIcon className="size-4" />
                Go to Meetings
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/agents">
                <BotIcon className="size-4" />
                Manage Agents
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Free Usage</CardTitle>
              <CardDescription>
                Track your current workspace limits and upgrade when needed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-medium">Agents</p>
                  <p className="text-muted-foreground">
                    {agentCount}/{MAX_FREE_AGENTS}
                  </p>
                </div>
                <Progress value={agentProgress} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-medium">Meetings</p>
                  <p className="text-muted-foreground">
                    {meetingCount}/{MAX_FREE_MEETINGS}
                  </p>
                </div>
                <Progress value={meetingProgress} />
              </div>
              <div className="flex justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link href="/upgrade">
                    View plans
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Focus</CardTitle>
              <CardDescription>
                A simple workflow to get your workspace moving.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border bg-muted/40 p-3 text-sm">
                1. Create or refine your core agents.
              </div>
              <div className="rounded-lg border bg-muted/40 p-3 text-sm">
                2. Launch a meeting and invite participants.
              </div>
              <div className="rounded-lg border bg-muted/40 p-3 text-sm">
                3. Review outcomes and iterate quickly.
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {quickActions.map((action) => (
            <Card key={action.title} className="border-border/60">
              <CardHeader>
                <div className="mb-2 inline-flex size-9 items-center justify-center rounded-md border bg-muted/40">
                  <action.icon className="size-4" />
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="px-0">
                  <Link href={action.href}>
                    Open
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
