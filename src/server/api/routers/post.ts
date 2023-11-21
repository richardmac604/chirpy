import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "npm/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import { postcss } from "tailwindcss";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async({ctx}) => {
    const posts = await ctx.db.post.findMany({
      take:100,
    });

  const users = await clerkClient.users.getUserList({
    userId: posts.map((post) => post.authorID),
    limit:100,
  });
 
  }),
});
